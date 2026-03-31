import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocationStore = defineStore('location', () => {
  const coordinates = ref(null)
  const error = ref(null)
  const permissionStatus = ref('unknown')

  function setCoordinates(lat, lon) {
    coordinates.value = { lat, lon }
    error.value = null
    permissionStatus.value = 'granted'
  }

  function setError(message) {
    error.value = message
    permissionStatus.value = 'denied'
  }

  function setPermissionStatus(status) {
    permissionStatus.value = status
  }

  function reset() {
    coordinates.value = null
    error.value = null
    permissionStatus.value = 'unknown'
  }

  return { coordinates, error, permissionStatus, setCoordinates, setError, setPermissionStatus, reset }
})
