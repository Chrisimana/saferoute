<template>
  <div id="app">
    <NavBar />
    <div v-if="isOffline" class="offline-banner" role="alert" aria-live="polite">
      📡 Mode Offline — Menampilkan data terakhir
    </div>
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import NavBar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useGeolocation } from '@/composables/useGeolocation'
import { useWeather } from '@/composables/useWeather'
import { useRiskCalculator } from '@/composables/useRiskCalculator'
import { useLocationStore } from '@/stores/locationStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { useRiskStore } from '@/stores/riskStore'
import { NotificationHandler } from '@/utils/NotificationHandler'

const isOffline = ref(!navigator.onLine)

const { error: locationError, requestLocation } = useGeolocation()
const { fetchWeather } = useWeather()
const { calculateRisk: computeRisk } = useRiskCalculator()
const locationStore = useLocationStore()
const weatherStore = useWeatherStore()
const riskStore = useRiskStore()

onMounted(() => {
  requestLocation()
  riskStore.loadHistory()
  window.addEventListener('offline', handleOffline)
  window.addEventListener('online', handleOnline)
  window.addEventListener('saferoute:weather-poll', onWeatherPoll)
})

onUnmounted(() => {
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('saferoute:weather-poll', onWeatherPoll)
})

function handleOffline() { isOffline.value = true }
function handleOnline() { isOffline.value = false }

function onWeatherPoll() {
  const coords = locationStore.coordinates
  if (coords) fetchWeather(coords.lat, coords.lon)
}

watch(() => locationStore.coordinates, (coords) => {
  if (coords) fetchWeather(coords.lat, coords.lon)
})

watch(() => weatherStore.currentWeather, (weather) => {
  if (weather) riskStore.setRisk(computeRisk(weather))
})

watch(() => riskStore.riskLevel, async (level) => {
  if (!level) return

  const weather = weatherStore.currentWeather
  riskStore.saveRecord({
    timestamp: new Date().toISOString(),
    riskLevel: level,
    precipitation: weather?.precipitation ?? null,
    temperature: weather?.temperature ?? null,
    humidity: weather?.humidity ?? null,
  })

  if (level === 'Tinggi') {
    await NotificationHandler.requestPermission()
    NotificationHandler.sendIfNotDuplicate(
      'Tinggi',
      '⚠️ Peringatan Risiko Tinggi',
      'Risiko bencana di lokasi Anda terdeteksi TINGGI. Segera periksa jalur evakuasi.',
    )
  }
})
</script>

<style>
.offline-banner {
  background: linear-gradient(135deg, #f57c00, #e65100);
  color: #fff;
  text-align: center;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  min-width: 0;
}
</style>
