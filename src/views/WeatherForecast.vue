<template>
  <div class="weather-page">

    <!-- Loading -->
    <div v-if="weatherStore.loading" class="loading-screen" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <span>Memuat data cuaca...</span>
    </div>

    <template v-else-if="weatherStore.currentWeather">
      <!-- ── Hero cuaca terkini ── -->
      <section class="weather-hero" :class="`weather-hero--${currentIcon}`" aria-label="Cuaca terkini">
        <div class="weather-hero-inner">
          <div class="hero-left">
            <p class="hero-location">📍 Lokasi Anda</p>
            <div class="hero-main">
              <span class="hero-temp">{{ weatherStore.currentWeather.temperature }}°C</span>
              <span class="hero-icon" :aria-label="iconLabel(currentIcon)" role="img">
                {{ iconEmoji(currentIcon) }}
              </span>
            </div>
            <p class="hero-condition">{{ iconLabel(currentIcon) }}</p>
            <p class="hero-updated">Diperbarui: {{ formattedUpdated }}</p>
          </div>
          <div class="hero-right">
            <div class="hero-badge" :style="riskStyle(currentRisk)">
              <span class="hero-badge-label">Risiko Saat Ini</span>
              <span class="hero-badge-value">{{ currentRisk }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4 metric cards -->
      <div class="metrics-row">
        <div class="metric-card">
          <span class="metric-icon" aria-hidden="true">🌡️</span>
          <span class="metric-label">Suhu</span>
          <span class="metric-value">{{ weatherStore.currentWeather.temperature }}°C</span>
          <span class="metric-sub">Terasa seperti {{ feelsLike }}°C</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon" aria-hidden="true">💧</span>
          <span class="metric-label">Kelembapan</span>
          <span class="metric-value">{{ weatherStore.currentWeather.humidity }}%</span>
          <span class="metric-sub">{{ humidityLabel }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon" aria-hidden="true">🌧️</span>
          <span class="metric-label">Curah Hujan</span>
          <span class="metric-value">{{ weatherStore.currentWeather.precipitation }} mm</span>
          <span class="metric-sub">per jam</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon" aria-hidden="true">💨</span>
          <span class="metric-label">Kecepatan Angin</span>
          <span class="metric-value">{{ weatherStore.currentWeather.windSpeed }} km/j</span>
          <span class="metric-sub">{{ windLabel }}</span>
        </div>
      </div>

      <!-- Ringkasan risiko minggu ini -->
      <section class="week-summary" aria-label="Ringkasan risiko minggu ini">
        <div class="week-summary-inner">
          <h2 class="section-title">Ringkasan Risiko 7 Hari</h2>
          <div class="risk-summary-row">
            <div v-for="(count, level) in weekRiskSummary" :key="level" class="risk-summary-item">
              <span class="risk-dot" :style="{ background: riskDotColor(level) }"></span>
              <span class="risk-summary-count">{{ count }}</span>
              <span class="risk-summary-label">{{ level }}</span>
            </div>
          </div>
          <p class="week-summary-note">{{ weekSummaryNote }}</p>
        </div>
      </section>

      <!-- ── Prakiraan mingguan ── -->
      <section class="forecast-section" aria-label="Prakiraan cuaca mingguan">
        <h2 class="section-title">Prakiraan Cuaca Mingguan</h2>
        <ol class="forecast-grid" role="list">
          <li
            v-for="day in forecastDays"
            :key="day.date"
            class="forecast-card"
            :class="day.riskLevel ? `forecast-card--${day.riskLevel.toLowerCase()}` : ''"
          >
            <time class="forecast-date" :datetime="day.date">{{ formatDate(day.date) }}</time>

            <span
              class="forecast-icon"
              :aria-label="`Kondisi: ${iconLabel(day.weatherIcon)}`"
              role="img"
            >{{ iconEmoji(day.weatherIcon) }}</span>

            <div class="forecast-temp" aria-label="Suhu">
              <span class="temp-max">{{ day.tempMax }}°</span>
              <span class="temp-sep">/</span>
              <span class="temp-min">{{ day.tempMin }}°</span>
            </div>

            <div class="forecast-precip" aria-label="Curah hujan">
              💧 {{ day.precipitationSum }} mm
            </div>

            <span
              class="forecast-risk"
              :style="riskStyle(day.riskLevel)"
              :aria-label="`Risiko: ${day.riskLevel}`"
            >{{ day.riskLevel }}</span>
          </li>
        </ol>
      </section>

      <!-- Tips cuaca -->
      <section class="tips-section" aria-label="Tips berdasarkan cuaca">
        <h2 class="section-title">💡 Tips Hari Ini</h2>
        <div class="tips-grid">
          <div v-for="tip in weatherTips" :key="tip.title" class="tip-card">
            <span class="tip-icon" aria-hidden="true">{{ tip.icon }}</span>
            <div>
              <p class="tip-title">{{ tip.title }}</p>
              <p class="tip-desc">{{ tip.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- No data -->
    <div v-else class="status-card status-card--error" role="alert">
      ⚠️ Prakiraan tidak tersedia saat ini. Pastikan izin lokasi telah diberikan.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { useRiskStore } from '@/stores/riskStore'
import { getWeatherIcon } from '@/utils/weatherUtils'

const weatherStore = useWeatherStore()
const riskStore = useRiskStore()

// ── Current weather helpers ──────────────────────────────────────────────────

const currentIcon = computed(() => {
  const w = weatherStore.currentWeather
  if (!w) return 'berawan'
  if (w.precipitation > 30) return 'badai'
  if (w.precipitation > 10) return 'hujan'
  if (w.precipitation > 0) return 'berawan'
  return 'cerah'
})

const currentRisk = computed(() => riskStore.riskLevel ?? 'Rendah')

const formattedUpdated = computed(() => {
  if (!weatherStore.lastUpdated) return '—'
  return new Date(weatherStore.lastUpdated).toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit',
  })
})

const feelsLike = computed(() => {
  const w = weatherStore.currentWeather
  if (!w) return '—'
  const fl = w.temperature - 0.4 * (1 - w.humidity / 100) * (w.temperature - 10)
  return Math.round(fl)
})

const humidityLabel = computed(() => {
  const h = weatherStore.currentWeather?.humidity ?? 0
  if (h < 30) return 'Sangat kering'
  if (h < 60) return 'Nyaman'
  if (h < 80) return 'Lembap'
  return 'Sangat lembap'
})

const windLabel = computed(() => {
  const w = weatherStore.currentWeather?.windSpeed ?? 0
  if (w < 10) return 'Tenang'
  if (w < 30) return 'Sepoi-sepoi'
  if (w < 60) return 'Berangin'
  return 'Kencang'
})

// ── Forecast ─────────────────────────────────────────────────────────────────

const forecastDays = computed(() => {
  const raw = weatherStore.forecast
  if (!raw || !Array.isArray(raw) || raw.length === 0) return []
  return raw.map(day => ({ ...day, weatherIcon: getWeatherIcon(day.weatherCode) }))
})

// ── Week risk summary ─────────────────────────────────────────────────────────

const weekRiskSummary = computed(() => {
  const counts = { Rendah: 0, Sedang: 0, Tinggi: 0 }
  forecastDays.value.forEach(d => { if (d.riskLevel) counts[d.riskLevel]++ })
  return counts
})

const weekSummaryNote = computed(() => {
  const s = weekRiskSummary.value
  if (s.Tinggi > 0) return `⚠️ ${s.Tinggi} hari berisiko tinggi dalam 7 hari ke depan. Tetap waspada.`
  if (s.Sedang > 0) return `🟡 ${s.Sedang} hari berisiko sedang. Pantau kondisi cuaca secara berkala.`
  return '✅ Kondisi aman sepanjang minggu ini. Tetap pantau perkembangan cuaca.'
})

// ── Tips ──────────────────────────────────────────────────────────────────────

const weatherTips = computed(() => {
  const w = weatherStore.currentWeather
  const tips = []

  if (!w) return tips

  if (w.precipitation > 10) {
    tips.push({ icon: '☂️', title: 'Bawa Payung', desc: 'Curah hujan cukup tinggi hari ini.' })
    tips.push({ icon: '🚗', title: 'Hati-hati Berkendara', desc: 'Jalan mungkin licin akibat hujan.' })
  } else {
    tips.push({ icon: '☀️', title: 'Cuaca Cerah', desc: 'Kondisi baik untuk beraktivitas di luar.' })
  }

  if (w.humidity > 80) {
    tips.push({ icon: '💦', title: 'Kelembapan Tinggi', desc: 'Minum air lebih banyak dan hindari aktivitas berat.' })
  }

  if (w.windSpeed > 40) {
    tips.push({ icon: '🌬️', title: 'Angin Kencang', desc: 'Hindari berada di bawah pohon atau bangunan tidak kokoh.' })
  }

  if (w.temperature > 35) {
    tips.push({ icon: '🧴', title: 'Suhu Panas', desc: 'Gunakan tabir surya dan hindari paparan matahari langsung.' })
  } else if (w.temperature < 20) {
    tips.push({ icon: '🧥', title: 'Suhu Dingin', desc: 'Kenakan pakaian hangat saat keluar rumah.' })
  }

  tips.push({ icon: '📱', title: 'Tetap Terhubung', desc: 'Pastikan ponsel terisi daya dan simpan nomor darurat.' })

  return tips
})

// ── Shared helpers ────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

const ICON_EMOJI = { cerah: '☀️', berawan: '⛅', hujan: '🌧️', badai: '⛈️' }
const ICON_LABEL = { cerah: 'Cerah', berawan: 'Berawan', hujan: 'Hujan', badai: 'Badai' }

function iconEmoji(icon) { return ICON_EMOJI[icon] ?? '⛅' }
function iconLabel(icon) { return ICON_LABEL[icon] ?? 'Berawan' }

const RISK_STYLES = {
  Rendah: { background: '#1b5e20', color: '#fff' },
  Sedang: { background: '#f57f17', color: '#fff' },
  Tinggi: { background: '#b71c1c', color: '#fff' },
}

function riskStyle(level) { return RISK_STYLES[level] ?? { background: '#546e7a', color: '#fff' } }

function riskDotColor(level) {
  return { Rendah: '#2e7d32', Sedang: '#f57f17', Tinggi: '#b71c1c' }[level] ?? '#546e7a'
}
</script>

<style scoped>
.weather-page {
  min-height: calc(100vh - 64px);
  background: #f0f4f8;
}

/* Loading */
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  color: #64748b;
  font-size: 1rem;
}

.spinner {
  width: 22px; height: 22px;
  border: 3px solid #e2e8f0;
  border-top-color: #1565c0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Hero */
.weather-hero {
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%);
  color: #fff;
  padding: 2rem 1.5rem;
}

.weather-hero--hujan  { background: linear-gradient(135deg, #1a237e, #283593, #303f9f); }
.weather-hero--badai  { background: linear-gradient(135deg, #212121, #37474f, #455a64); }
.weather-hero--berawan { background: linear-gradient(135deg, #37474f, #455a64, #546e7a); }

.weather-hero-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-left { flex: 1; min-width: 200px; }

.hero-location {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.75);
  margin: 0 0 0.5rem;
}

.hero-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.hero-temp {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.hero-icon { font-size: 3rem; line-height: 1; }

.hero-condition {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.hero-updated {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
}

.hero-badge {
  border-radius: 14px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 130px;
  text-align: center;
}

.hero-badge-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.85;
}

.hero-badge-value {
  font-size: 1.5rem;
  font-weight: 900;
}

/* Metrics */
.metrics-row {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.875rem;
}

.metric-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.metric-icon { font-size: 1.5rem; }
.metric-label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
.metric-value { font-size: 1.6rem; font-weight: 900; color: #1a202c; }
.metric-sub { font-size: 0.78rem; color: #94a3b8; }

/* Week summary */
.week-summary {
  max-width: 960px;
  margin: 1.25rem auto 0;
  padding: 0 1.5rem;
}

.week-summary-inner {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem;
}

.risk-summary-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.risk-summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.risk-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.risk-summary-count {
  font-size: 1.4rem;
  font-weight: 900;
  color: #1a202c;
}

.risk-summary-label {
  font-size: 0.85rem;
  color: #64748b;
}

.week-summary-note {
  font-size: 0.875rem;
  color: #475569;
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

/* Forecast */
.forecast-section {
  max-width: 960px;
  margin: 1.25rem auto 0;
  padding: 0 1.5rem;
}

.forecast-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.875rem;
}

.forecast-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  text-align: center;
  border-top: 4px solid transparent;
  border: 1px solid #e2e8f0;
  border-top-width: 4px;
  transition: transform 0.15s, box-shadow 0.15s;
}

.forecast-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.forecast-card--rendah { border-top-color: #2e7d32; }
.forecast-card--sedang { border-top-color: #f57f17; }
.forecast-card--tinggi { border-top-color: #b71c1c; }

.forecast-date { font-size: 0.78rem; font-weight: 700; color: #475569; text-transform: capitalize; }
.forecast-icon { font-size: 2.25rem; line-height: 1; }

.forecast-temp { display: flex; align-items: center; gap: 2px; font-size: 0.875rem; }
.temp-max { font-weight: 800; color: #c62828; }
.temp-sep { color: #94a3b8; }
.temp-min { color: #1565c0; font-weight: 600; }

.forecast-precip { font-size: 0.78rem; color: #475569; }

.forecast-risk {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

/* Tips */
.tips-section {
  max-width: 960px;
  margin: 1.25rem auto 0;
  padding: 0 1.5rem 3rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.875rem;
}

.tip-card {
  background: #fff;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.tip-icon { font-size: 1.75rem; flex-shrink: 0; line-height: 1; margin-top: 0.1rem; }
.tip-title { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin: 0 0 0.2rem; }
.tip-desc { font-size: 0.82rem; color: #64748b; margin: 0; line-height: 1.4; }

/* Status card */
.status-card {
  max-width: 960px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.status-card--error { color: #b71c1c; background: #fff5f5; }

@media (max-width: 600px) {
  .weather-hero { padding: 1.5rem 1rem; }
  .metrics-row, .week-summary, .forecast-section, .tips-section { padding-left: 1rem; padding-right: 1rem; }
  .forecast-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.625rem; }
  .forecast-card { padding: 1rem 0.625rem; }
  .tips-grid { grid-template-columns: 1fr; }
}
</style>
