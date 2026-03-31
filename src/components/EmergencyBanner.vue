<template>
  <div
    v-if="riskStore.riskLevel === 'Tinggi'"
    class="emergency-banner"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="banner-inner">
      <span class="banner-pulse" aria-hidden="true"></span>
      <span class="banner-icon" aria-hidden="true">⚠️</span>
      <span class="banner-message">
        <strong>PERINGATAN DARURAT:</strong>
        Tingkat risiko bencana di lokasi Anda saat ini <strong>TINGGI</strong>.
        Segera ambil tindakan pencegahan.
      </span>
      <RouterLink to="/evacuation-route" class="banner-link" aria-label="Lihat jalur evakuasi">
        Lihat Jalur Evakuasi →
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRiskStore } from '@/stores/riskStore'
const riskStore = useRiskStore()
</script>

<style scoped>
.emergency-banner {
  background: linear-gradient(135deg, #b71c1c, #c62828);
  color: #fff;
  box-shadow: 0 2px 8px rgba(183,28,28,0.4);
}

.banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex-wrap: wrap;
}

.banner-pulse {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.banner-icon { font-size: 1.25rem; flex-shrink: 0; }

.banner-message {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  min-width: 200px;
}

.banner-link {
  color: #fff;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 8px;
  padding: 0.4rem 1rem;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: background 0.15s;
}

.banner-link:hover,
.banner-link:focus-visible {
  background: rgba(255,255,255,0.3);
  outline: 2px solid #fff;
  outline-offset: 2px;
}
</style>
