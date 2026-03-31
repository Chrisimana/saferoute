import { ref } from 'vue'

const THRESHOLDS = { LOW: 10, HIGH: 30 }

const COLOR_MAP = {
  Rendah: '#4CAF50',
  Sedang: '#FFEB3B',
  Tinggi: '#F44336',
}

/**
 * Classify precipitation into a risk level.
 * @param {{ precipitation: number }} weatherData
 * @returns {'Rendah' | 'Sedang' | 'Tinggi'}
 */
export function calculateRisk(weatherData) {
  const p = weatherData?.precipitation ?? 0
  if (p < THRESHOLDS.LOW) return 'Rendah'
  if (p <= THRESHOLDS.HIGH) return 'Sedang'
  return 'Tinggi'
}

export function useRiskCalculator(weatherData) {
  const riskLevel = ref(null)
  const riskColor = ref(null)

  function calculate(data) {
    const level = calculateRisk(data ?? weatherData?.value ?? weatherData)
    riskLevel.value = level
    riskColor.value = COLOR_MAP[level]
    return level
  }

  if (weatherData) {
    const initial = weatherData?.value ?? weatherData
    if (initial) calculate(initial)
  }

  return { riskLevel, riskColor, calculateRisk: calculate }
}
