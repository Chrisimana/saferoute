<template>
  <div class="weather-panel" aria-label="Panel cuaca terkini">
    <div v-if="weatherStore.loading" class="panel-status" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      Memuat data cuaca...
    </div>

    <div v-else-if="weatherStore.error && !weatherStore.currentWeather" class="panel-status panel-status--error" role="alert">
      ⚠️ {{ weatherStore.error }}
    </div>

    <template v-else-if="weatherStore.currentWeather">
      <h2 class="panel-title">🌡️ Cuaca Terkini</h2>
      <ul class="weather-grid" role="list">
        <li class="weather-item">
          <span class="weather-item-icon" aria-hidden="true">🌡️</span>
          <span class="weather-item-label">Suhu</span>
          <span class="weather-item-value">{{ weatherStore.currentWeather.temperature }}°C</span>
        </li>
        <li class="weather-item">
          <span class="weather-item-icon" aria-hidden="true">💧</span>
          <span class="weather-item-label">Kelembapan</span>
          <span class="weather-item-value">{{ weatherStore.currentWeather.humidity }}%</span>
        </li>
        <li class="weather-item">
          <span class="weather-item-icon" aria-hidden="true">🌧️</span>
          <span class="weather-item-label">Curah Hujan</span>
          <span class="weather-item-value">{{ weatherStore.currentWeather.precipitation }} mm/jam</span>
        </li>
        <li class="weather-item">
          <span class="weather-item-icon" aria-hidden="true">💨</span>
          <span class="weather-item-label">Kecepatan Angin</span>
          <span class="weather-item-value">{{ weatherStore.currentWeather.windSpeed }} km/jam</span>
        </li>
      </ul>
    </template>

    <div v-else class="panel-status" role="status">
      📡 Data cuaca belum tersedia.
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
const weatherStore = useWeatherStore()
</script>

<style scoped>
.weather-panel {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
  border: 1px solid #e2e8f0;
}

.panel-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem;
}

.weather-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.weather-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
}

.weather-item-icon { font-size: 1.2rem; flex-shrink: 0; }

.weather-item-label {
  flex: 1;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.weather-item-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a202c;
  white-space: nowrap;
}

.panel-status {
  color: #64748b;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-status--error { color: #b71c1c; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid #e2e8f0;
  border-top-color: #1565c0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
