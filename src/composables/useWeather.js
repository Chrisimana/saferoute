import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'
const RETRY_INTERVAL_MS = 60_000

/**
 * Build the Open-Meteo API URL for given coordinates.
 * @param {number} lat
 * @param {number} lon
 * @returns {string}
 */
function buildUrl(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
    forecast_days: '7',
    timezone: 'auto',
  })
  return `${OPEN_METEO_URL}?${params.toString()}`
}

function parseCurrentWeather(apiResponse) {
  const c = apiResponse.current
  return {
    temperature: c.temperature_2m,
    humidity: c.relative_humidity_2m,
    precipitation: c.precipitation,
    windSpeed: c.wind_speed_10m,
    timestamp: c.time ?? new Date().toISOString(),
  }
}

function parseForecast(apiResponse) {
  const d = apiResponse.daily
  return d.time.map((date, i) => {
    const precipitationSum = d.precipitation_sum[i] ?? 0
    return {
      date,
      tempMax: d.temperature_2m_max[i],
      tempMin: d.temperature_2m_min[i],
      precipitationSum,
      weatherCode: d.weather_code[i],
      riskLevel: _calcRisk(precipitationSum),
    }
  })
}

function _calcRisk(precipitation) {
  if (precipitation < 10) return 'Rendah'
  if (precipitation <= 30) return 'Sedang'
  return 'Tinggi'
}

export function useWeather() {
  const currentWeather = ref(null)
  const forecast = ref(null)
  const loading = ref(false)
  const error = ref(null)

  let _retryTimer = null

  function _clearRetry() {
    if (_retryTimer !== null) {
      clearTimeout(_retryTimer)
      _retryTimer = null
    }
  }

  function _scheduleRetry(lat, lon) {
    _clearRetry()
    _retryTimer = setTimeout(() => fetchWeather(lat, lon), RETRY_INTERVAL_MS)
  }

  async function fetchWeather(lat, lon) {
    _clearRetry()
    loading.value = true
    error.value = null

    try {
      const response = await fetch(buildUrl(lat, lon))
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()

      currentWeather.value = parseCurrentWeather(data)
      forecast.value = parseForecast(data)
      loading.value = false

      _syncToStore()
    } catch (err) {
      error.value = 'Data tidak tersedia. Mencoba ulang...'
      loading.value = false
      _syncToStore()
      _scheduleRetry(lat, lon)
    }
  }

  function _syncToStore() {
    try {
      const store = useWeatherStore()
      if (currentWeather.value) {
        store.setCurrentWeather(currentWeather.value)
        store.setForecast(forecast.value)
      }
      if (error.value) {
        store.setError(error.value)
      }
      store.setLoading(loading.value)
    } catch {
    }
  }

  return { currentWeather, forecast, loading, error, fetchWeather }
}
