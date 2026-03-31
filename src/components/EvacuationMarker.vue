<template>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'

const props = defineProps({
  point: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click'])

const mapContext = inject('leafletMap')

let marker = null

onMounted(() => {
  const map = mapContext?.instance ?? (typeof mapContext?.addLayer === 'function' ? mapContext : null)
  if (!map) return

  const escapedName = props.point.name
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const iconHtml = `
    <div
      aria-label="Titik evakuasi: ${escapedName}"
      role="img"
      style="
        width:36px;height:36px;
        background:linear-gradient(135deg,#1565c0,#1976d2);
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 3px 8px rgba(0,0,0,0.35);
      "
    ></div>
  `

  const icon = L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  })

  marker = L.marker([props.point.coordinates.lat, props.point.coordinates.lon], { icon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Segoe UI',sans-serif;min-width:180px;padding:4px 0;">
        <strong style="font-size:0.95rem;color:#0d47a1;">${props.point.name}</strong>
        <p style="margin:6px 0 4px;font-size:0.82rem;color:#555;">${props.point.address}</p>
        <p style="margin:0;font-size:0.82rem;">
          Kapasitas: <strong style="color:#1565c0;">${props.point.capacity.toLocaleString('id-ID')}</strong> orang
        </p>
      </div>
    `)

  marker.on('click', () => emit('click', props.point))
})

onUnmounted(() => {
  const map = mapContext?.instance ?? (typeof mapContext?.removeLayer === 'function' ? mapContext : null)
  if (marker && map) {
    map.removeLayer(marker)
    marker = null
  }
})
</script>
