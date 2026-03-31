import { calculateRisk } from '@/composables/useRiskCalculator'

/**
 * @param {number} weatherCode
 * @returns {'cerah' | 'berawan' | 'hujan' | 'badai'}
 */
export function getWeatherIcon(weatherCode) {
  if (weatherCode === 0) return 'cerah'
  if (weatherCode >= 1 && weatherCode <= 3) return 'berawan'
  if (weatherCode === 45 || weatherCode === 48) return 'berawan'
  if (weatherCode >= 51 && weatherCode <= 55) return 'hujan'
  if (weatherCode >= 61 && weatherCode <= 65) return 'hujan'
  if (weatherCode >= 71 && weatherCode <= 75) return 'hujan'
  if (weatherCode >= 80 && weatherCode <= 82) return 'hujan'
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) return 'badai'
  return 'berawan'
}

/**
 * @param {object} apiResponse - Raw Open-Meteo API response
 * @returns {Array<{
 * }>}
 */

export function processForecast(apiResponse) {
  const d = apiResponse?.daily
  if (!d || !Array.isArray(d.time)) return []

  return d.time.slice(0, 7).map((date, i) => {
    const precipitationSum = d.precipitation_sum?.[i] ?? 0
    const riskLevel = calculateRisk({ precipitation: precipitationSum })

    return {
      date,
      tempMax: d.temperature_2m_max?.[i] ?? null,
      tempMin: d.temperature_2m_min?.[i] ?? null,
      precipitationSum,
      weatherCode: d.weather_code?.[i] ?? 0,
      riskLevel,
    }
  })
}
