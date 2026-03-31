import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore('route', () => {
  const activeRoute = ref(null)
  const routeError = ref(null)

  function setRoute(distance, duration) {
    activeRoute.value = { distance, duration, isMain: true }
    routeError.value = null
  }

  function setError(msg) {
    routeError.value = msg
    activeRoute.value = null
  }

  function clearRoute() {
    activeRoute.value = null
    routeError.value = null
  }

  return { activeRoute, routeError, setRoute, setError, clearRoute }
})
