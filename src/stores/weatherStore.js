import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const forecast = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)

  function setCurrentWeather(data) {
    currentWeather.value = data
    lastUpdated.value = new Date().toISOString()
    error.value = null
  }

  function setForecast(data) {
    forecast.value = data
  }

  function setLoading(value) {
    loading.value = value
  }

  function setError(message) {
    error.value = message
    loading.value = false
  }

  function reset() {
    currentWeather.value = null
    forecast.value = null
    loading.value = false
    error.value = null
    lastUpdated.value = null
  }

  return { currentWeather, forecast, loading, error, lastUpdated, setCurrentWeather, setForecast, setLoading, setError, reset }
})
