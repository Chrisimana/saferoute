<template>
  <div class="evac-page">
    <div class="evac-inner">
      <h1 class="page-title">🚨 Rute Evakuasi</h1>

      <div v-if="routeStore.routeError" class="alert-card alert-card--error" role="alert">
        <span aria-hidden="true">⚠️</span>
        {{ routeStore.routeError }}
      </div>

      <div v-else-if="routeStore.activeRoute" class="route-card">
        <div class="route-stats">
          <div class="route-stat">
            <span class="stat-icon" aria-hidden="true">📏</span>
            <span class="stat-value">{{ routeStore.activeRoute.distance.toFixed(1) }}</span>
            <span class="stat-unit">km</span>
            <span class="stat-label">Jarak</span>
          </div>
          <div class="route-divider" aria-hidden="true"></div>
          <div class="route-stat">
            <span class="stat-icon" aria-hidden="true">⏱️</span>
            <span class="stat-value">{{ routeStore.activeRoute.duration }}</span>
            <span class="stat-unit">menit</span>
            <span class="stat-label">Estimasi Waktu</span>
          </div>
        </div>
        <p class="route-hint">Klik jalur alternatif pada peta untuk memperbarui rute.</p>
        <RouterLink to="/map" class="btn-primary">🗺️ Lihat di Peta</RouterLink>
      </div>

      <div v-else class="empty-card">
        <span class="empty-icon" aria-hidden="true">🗺️</span>
        <p class="empty-title">Belum ada rute dipilih</p>
        <p class="empty-desc">Buka peta dan klik marker titik evakuasi untuk menghitung rute dari lokasi Anda.</p>
        <RouterLink to="/map" class="btn-primary">Buka Peta Interaktif</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouteStore } from '@/stores/routeStore'
const routeStore = useRouteStore()
</script>

<style scoped>
.evac-page {
  min-height: calc(100vh - 64px);
  background: var(--surface-2, #f8fafc);
  padding: 2rem 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.evac-inner {
  width: 100%;
  max-width: 520px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 1.5rem;
}

.alert-card {
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.alert-card--error {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
}

.route-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.route-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.route-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.stat-icon { font-size: 1.5rem; }

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1565c0;
  line-height: 1;
}

.stat-unit {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}

.stat-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.route-divider {
  width: 1px;
  height: 60px;
  background: #e2e8f0;
}

.route-hint {
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
}

.empty-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.empty-icon { font-size: 3.5rem; }

.empty-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
}

.empty-desc {
  font-size: 0.9rem;
  color: #64748b;
  max-width: 320px;
  line-height: 1.5;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  min-height: 44px;
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 2px 8px rgba(21,101,192,0.3);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  opacity: 0.9;
  transform: translateY(-1px);
  outline: 2px solid #1565c0;
  outline-offset: 2px;
}
</style>
