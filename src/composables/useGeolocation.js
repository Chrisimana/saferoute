import { ref } from 'vue'
import { useLocationStore } from '@/stores/locationStore'

export function useGeolocation() {
  const coordinates = ref(null)
  const error = ref(null)

  function requestLocation() {
    if (!navigator.geolocation) {
      error.value = 'Geolokasi tidak didukung oleh browser ini.'
      _syncToStore()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        error.value = null
        _syncToStore()
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          error.value = 'Izin lokasi ditolak. Aktifkan lokasi atau masukkan koordinat secara manual.'
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          error.value = 'Informasi lokasi tidak tersedia.'
        } else if (err.code === err.TIMEOUT) {
          error.value = 'Permintaan lokasi habis waktu. Coba lagi.'
        } else {
          error.value = 'Gagal mendapatkan lokasi.'
        }
        _syncToStore()
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 }
    )
  }

  function _syncToStore() {
    try {
      const store = useLocationStore()
      if (coordinates.value) {
        store.setCoordinates(coordinates.value.lat, coordinates.value.lon)
      } else if (error.value) {
        store.setError(error.value)
      }
    } catch {
    }
  }

  return { coordinates, error, requestLocation }
}
