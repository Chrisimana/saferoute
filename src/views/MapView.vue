<template>
  <div class="map-view-wrapper">
    <div v-if="geoJsonError" class="map-banner map-banner--warn" role="alert">
      {{ geoJsonError }}
    </div>
    <div v-if="routeStore.routeError" class="map-banner map-banner--error" role="alert">
      {{ routeStore.routeError }}
    </div>
    <div v-if="!locationStore.coordinates && !manualStart" class="map-banner map-banner--info" role="status">
      Lokasi tidak tersedia. Klik pada peta untuk menentukan titik awal secara manual.
    </div>
    <div v-if="manualStart" class="map-banner map-banner--success" role="status">
      Titik awal manual ditetapkan. Klik marker evakuasi untuk menghitung rute.
      <button class="btn-clear" @click="clearManualStart">Hapus</button>
    </div>

    <div ref="mapContainer" class="map-container"></div>

    <template v-if="mapReady">
      <EvacuationMarker
        v-for="point in evacuationPoints"
        :key="point.id"
        :point="point"
        @click="onMarkerClick"
      />
    </template>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import { ref, onMounted, onUnmounted, provide, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import L from 'leaflet'
import EvacuationMarker from '@/components/EvacuationMarker.vue'
import { getZoneStyle, buildPopupContent, getRouteStyle } from '@/utils/mapUtils.js'
import evacuationPoints from '@/data/evacuationPoints.js'
import zonaRisikoData from '@/data/zonaRisiko.json'
import { useLocationStore } from '@/stores/locationStore.js'
import { useRouteStore } from '@/stores/routeStore.js'

const mapContainer = ref(null)
const geoJsonError = ref(null)
const manualStart = ref(null)
const mapReady = ref(false)

const locationStore = useLocationStore()
const routeStore = useRouteStore()
const route = useRoute()

let mapInstance = null
let routingControl = null
let manualStartMarker = null
let userMarker = null

const mapContext = { instance: null }
provide('leafletMap', mapContext)

onMounted(async () => {
  // leaflet-routing-machine needs window.L before it loads
  window.L = L
  await import('leaflet-routing-machine')

  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  mapInstance = L.map(mapContainer.value, {
    center: [0, 0],
    zoom: 2,
  })

  mapContext.instance = mapInstance

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(mapInstance)

  loadGeoJson()
  mapInstance.on('click', onMapClick)

  nextTick(() => {
    if (mapInstance) mapInstance.invalidateSize()
  })
  setTimeout(() => {
    if (mapInstance) mapInstance.invalidateSize()
  }, 300)

  mapReady.value = true

  if (locationStore.coordinates) {
    panToUser(locationStore.coordinates)
  }

  const pointId = route.query.pointId
  if (pointId) {
    const target = evacuationPoints.find(p => p.id === pointId)
    if (target) {
      mapInstance.setView([target.coordinates.lat, target.coordinates.lon], 15)
      setTimeout(() => {
        mapInstance.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            const pos = layer.getLatLng()
            if (
              Math.abs(pos.lat - target.coordinates.lat) < 0.0001 &&
              Math.abs(pos.lng - target.coordinates.lon) < 0.0001
            ) {
              layer.openPopup()
            }
          }
        })
      }, 400)
    }
  }
})

watch(() => locationStore.coordinates, (coords) => {
  if (coords && mapInstance) {
    mapInstance.invalidateSize()
    panToUser(coords)
  }
})

function panToUser(coords) {
  if (!mapInstance) return
  mapInstance.setView([coords.lat, coords.lon], 14)

  if (userMarker) {
    userMarker.setLatLng([coords.lat, coords.lon])
  } else {
    const iconHtml = `
      <div style="
        width:18px;height:18px;
        background:#1565c0;
        border:3px solid #fff;
        border-radius:50%;
        box-shadow:0 0 0 4px rgba(21,101,192,0.25);
      "></div>
    `
    userMarker = L.marker([coords.lat, coords.lon], {
      icon: L.divIcon({ html: iconHtml, className: '', iconSize: [18, 18], iconAnchor: [9, 9] }),
      zIndexOffset: 1000,
    })
      .addTo(mapInstance)
      .bindPopup('Lokasi Anda')
  }
}

function loadGeoJson() {
  try {
    L.geoJSON(zonaRisikoData, {
      style: (feature) => getZoneStyle(feature.properties.riskLevel),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(buildPopupContent(feature))
      },
    }).addTo(mapInstance)
  } catch (err) {
    console.error('[MapView] GeoJSON error:', err)
    geoJsonError.value = 'Gagal memuat data zona risiko. Peta dasar tetap tersedia.'
  }
}

function onMapClick(e) {
  if (locationStore.coordinates) return
  const { lat, lng } = e.latlng
  manualStart.value = { lat, lon: lng }
  if (manualStartMarker) mapInstance.removeLayer(manualStartMarker)
  manualStartMarker = L.circleMarker([lat, lng], {
    radius: 10, color: '#FF5722', fillColor: '#FF5722', fillOpacity: 0.8, weight: 2,
  }).addTo(mapInstance).bindPopup('Titik awal manual').openPopup()
}

function clearManualStart() {
  manualStart.value = null
  if (manualStartMarker) { mapInstance.removeLayer(manualStartMarker); manualStartMarker = null }
  clearRouting()
}

function clearRouting() {
  if (routingControl) {
    try { mapInstance.removeControl(routingControl) } catch (_) {}
    routingControl = null
  }
  routeStore.clearRoute()
}

function onMarkerClick(point) {
  if (mapInstance) mapInstance.setView([point.coordinates.lat, point.coordinates.lon], 15)
  const start = locationStore.coordinates ?? manualStart.value
  if (!start) return
  calculateRoute(start, point.coordinates)
}

function calculateRoute(from, to) {
  clearRouting()
  if (!L.Routing) { routeStore.setError('Modul routing tidak tersedia'); return }

  const mainStyle = getRouteStyle(true)
  const altStyle = getRouteStyle(false)

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(from.lat, from.lon ?? from.lng),
      L.latLng(to.lat, to.lon ?? to.lng),
    ],
    routeWhileDragging: false,
    addWaypoints: false,
    show: false,
    lineOptions: { styles: [mainStyle] },
    altLineOptions: { styles: [altStyle] },
    createMarker: () => null,
  })

  routingControl.on('routesfound', (e) => {
    const primary = e.routes?.[0]
    if (primary) {
      routeStore.setRoute(
        +(primary.summary.totalDistance / 1000).toFixed(2),
        Math.round(primary.summary.totalTime / 60),
      )
    }
  })

  routingControl.on('routingerror', () => {
    routeStore.setError('Rute tidak ditemukan. Pilih titik tujuan lain.')
  })

  try { routingControl.addTo(mapInstance) } catch (err) {
    console.error('[MapView] Routing error:', err)
    routeStore.setError('Rute tidak ditemukan')
  }
}

onUnmounted(() => {
  clearRouting()
  if (userMarker && mapInstance) { mapInstance.removeLayer(userMarker); userMarker = null }
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
    mapContext.instance = null
  }
})
</script>

<style scoped>
.map-view-wrapper {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  background: #e8eaf0;
}

.map-container {
  flex: 1;
  width: 100%;
  min-height: 0;
}

.map-banner {
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 1000;
  flex-shrink: 0;
}

.map-banner--warn   { background: #fff8e1; color: #6d4c00; border-bottom: 1px solid #ffe082; }
.map-banner--error  { background: #ffebee; color: #b71c1c; border-bottom: 1px solid #ef9a9a; }
.map-banner--info   { background: #e3f2fd; color: #0d47a1; border-bottom: 1px solid #90caf9; }
.map-banner--success { background: #e8f5e9; color: #1b5e20; border-bottom: 1px solid #a5d6a7; }

.btn-clear {
  background: none;
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  color: inherit;
  min-height: 28px;
  min-width: 28px;
}

.btn-clear:hover { background: rgba(0,0,0,0.08); }
</style>
