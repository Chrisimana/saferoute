<template>
  <span
    class="risk-badge"
    :style="badgeStyle"
    role="status"
    :aria-label="`Tingkat risiko: ${riskLevel ?? 'Tidak diketahui'}`"
  >
    <span class="risk-badge__dot" :style="dotStyle" aria-hidden="true"></span>
    <span class="risk-badge__label">{{ riskLevel ?? 'Memuat...' }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  riskLevel: {
    type: String,
    default: null,
    validator: (v) => v === null || ['Rendah', 'Sedang', 'Tinggi'].includes(v),
  },
})

const STYLES = {
  Rendah: { bg: '#1b5e20', text: '#ffffff', dot: '#4CAF50' }, 
  Sedang: { bg: '#FFEB3B', text: '#1a1a1a', dot: '#f9a825' },  
  Tinggi: { bg: '#F44336', text: '#ffffff', dot: '#b71c1c' },  
}

const badgeStyle = computed(() => {
  const s = STYLES[props.riskLevel]
  if (!s) return { backgroundColor: '#e0e0e0', color: '#333333' }
  return {
    backgroundColor: s.bg,
    color: s.text,
  }
})

const dotStyle = computed(() => {
  const s = STYLES[props.riskLevel]
  if (!s) return { backgroundColor: '#9e9e9e' }
  return { backgroundColor: s.dot }
})
</script>

<style scoped>
.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  min-height: 44px;
  min-width: 44px;
  box-sizing: border-box;
}

.risk-badge__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.risk-badge__label {
  white-space: nowrap;
}
</style>
