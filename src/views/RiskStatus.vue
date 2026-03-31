<template>
  <div class="risk-status-page">
    <div class="risk-status-inner">
      <h1 class="page-title">Status Risiko Lokal</h1>

      <div v-if="riskStore.riskLevel" class="risk-display">
        <div
          class="risk-circle"
          :style="{ background: riskStore.riskColor }"
          role="img"
          :aria-label="`Tingkat risiko: ${riskStore.riskLevel}`"
        >
          <span class="risk-circle-icon" aria-hidden="true">{{ riskIcon }}</span>
        </div>
        <div class="risk-info">
          <span class="risk-level-label" :style="{ color: riskStore.riskColor }">
            {{ riskStore.riskLevel }}
          </span>
          <p class="risk-desc">{{ riskDescription }}</p>
        </div>
      </div>

      <div v-else class="empty-card" role="status">
        <span aria-hidden="true">📡</span>
        Data risiko belum tersedia. Pastikan izin lokasi telah diberikan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRiskStore } from '@/stores/riskStore'

const riskStore = useRiskStore()

const riskIcon = computed(() => {
  if (riskStore.riskLevel === 'Tinggi') return '🔴'
  if (riskStore.riskLevel === 'Sedang') return '🟡'
  return '🟢'
})

const riskDescription = computed(() => {
  if (riskStore.riskLevel === 'Tinggi') return 'Curah hujan sangat tinggi. Segera ambil tindakan evakuasi.'
  if (riskStore.riskLevel === 'Sedang') return 'Curah hujan sedang. Pantau kondisi cuaca secara berkala.'
  return 'Kondisi aman. Tetap waspada terhadap perubahan cuaca.'
})
</script>

<style scoped>
.risk-status-page {
  min-height: calc(100vh - 64px);
  background: var(--surface-2, #f8fafc);
  padding: 2rem 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.risk-status-inner {
  width: 100%;
  max-width: 480px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 1.5rem;
}

.risk-display {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.risk-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.risk-circle-icon { font-size: 2rem; }

.risk-info { display: flex; flex-direction: column; gap: 0.5rem; }

.risk-level-label {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.risk-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
}

.empty-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-card span { font-size: 2rem; }
</style>
