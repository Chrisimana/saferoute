import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { NotificationHandler } from '@/utils/NotificationHandler'

const STORAGE_KEY = 'saferoute_risk_history'
const MAX_RECORDS = 200
const POLLING_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

export const useRiskStore = defineStore('risk', () => {
  // 'Rendah' | 'Sedang' | 'Tinggi' | null
  const riskLevel = ref(null)
  // '#4CAF50' | '#FFEB3B' | '#F44336' | null
  const riskColor = ref(null)
  // RiskRecord[]
  const history = ref([])

  const COLOR_MAP = {
    Rendah: '#4CAF50',
    Sedang: '#FFEB3B',
    Tinggi: '#F44336',
  }

  function setRisk(level) {
    riskLevel.value = level
    riskColor.value = COLOR_MAP[level] ?? null
  }

  /**
   * @param {Object} record 
   */

  function saveRecord(record) {
    history.value.push(record)

    if (history.value.length > MAX_RECORDS) {
      history.value = history.value.slice(-MAX_RECORDS)
    }

    _persistToStorage()
  }

  function _persistToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        history.value = history.value.slice(Math.floor(history.value.length / 2))
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
        } catch {
          console.error('[riskStore] localStorage still full after trimming, skipping persist.')
        }
      } else {
        console.error('[riskStore] Failed to persist to localStorage:', e)
      }
    }
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        history.value = JSON.parse(raw)
      }
    } catch (e) {
      console.error('[riskStore] Failed to load history from localStorage:', e)
      history.value = []
    }
  }

  function clearHistory() {
    history.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    NotificationHandler.requestPermission().catch(() => {
    })
  }

  let _pollingTimer = null

  function _startPolling() {
    if (_pollingTimer !== null) return
    _pollingTimer = setInterval(() => {
      import('@/stores/weatherStore').then(({ useWeatherStore }) => {
        try {
          const weatherStore = useWeatherStore()
          weatherStore.setLoading(true)
          window.dispatchEvent(new CustomEvent('saferoute:weather-poll'))
        } catch {
        }
      }).catch(() => {})
    }, POLLING_INTERVAL_MS)
  }

  function _stopPolling() {
    if (_pollingTimer !== null) {
      clearInterval(_pollingTimer)
      _pollingTimer = null
    }
  }

  watch(riskLevel, (newLevel) => {
    if (newLevel === 'Tinggi') {
      NotificationHandler.sendIfNotDuplicate(
        'Tinggi',
        '⚠️ Peringatan Risiko Tinggi',
        'Risiko bencana di lokasi Anda terdeteksi TINGGI. Segera periksa jalur evakuasi.',
      )
      _startPolling()
    } else {
      _stopPolling()
    }
  })

  /**
   * @param {Object} record
   */

  function saveRiskRecord(record) {
    saveRecord(record)
  }

  /**
   * @returns {Array}
   */
  function loadRiskRecords() {
    loadHistory()
    return history.value
  }

  return {
    riskLevel,
    riskColor,
    history,
    setRisk,
    saveRecord,
    saveRiskRecord,
    loadHistory,
    loadRiskRecords,
    clearHistory,
    _startPolling,
    _stopPolling,
  }
})
