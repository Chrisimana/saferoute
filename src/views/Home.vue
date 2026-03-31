<template>
  <div class="home">
    <EmergencyBanner />

    <!-- ── Hero ── -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-badge-row">
            <span class="hero-badge">Platform Kesiapsiagaan Bencana</span>
          </div>
          <h1 class="hero-title">
            <span aria-hidden="true">🛡️</span> SafeRoute
          </h1>
          <p class="hero-subtitle">
            Pantau risiko bencana secara real-time, temukan jalur evakuasi terdekat,
            dan lindungi diri serta keluarga Anda dari ancaman bencana alam.
          </p>
          <div class="hero-actions">
            <RouterLink to="/map" class="btn-hero-primary">🗺️ Buka Peta</RouterLink>
            <RouterLink to="/safety" class="btn-hero-secondary">🛟 Panduan Darurat</RouterLink>
          </div>
        </div>

        <!-- Risk + weather snapshot -->
        <div class="hero-cards">
          <div class="risk-card" aria-label="Status risiko lokal">
            <span class="card-label">Risiko Lokal</span>
            <RiskBadge :risk-level="riskStore.riskLevel" />
            <p v-if="locationError" class="location-error" role="alert">⚠️ {{ locationError }}</p>
            <p v-else-if="!riskStore.riskLevel" class="location-hint">Meminta izin lokasi...</p>
          </div>
          <div v-if="weatherStore.currentWeather" class="weather-snap" aria-label="Cuaca terkini">
            <span class="card-label">Cuaca Sekarang</span>
            <span class="weather-snap-temp">{{ weatherStore.currentWeather.temperature }}°C</span>
            <span class="weather-snap-detail">💧 {{ weatherStore.currentWeather.precipitation }} mm/jam</span>
            <span class="weather-snap-detail">💨 {{ weatherStore.currentWeather.windSpeed }} km/j</span>
          </div>
        </div>
      </div>
    </section>

    <div class="home-body">

      <!-- ── Status bar ── -->
      <section class="status-bar" aria-label="Status sistem">
        <div class="status-item">
          <span class="status-dot" :class="locationStore.coordinates ? 'dot--green' : 'dot--gray'"></span>
          <span>{{ locationStore.coordinates ? 'Lokasi aktif' : 'Menunggu lokasi' }}</span>
        </div>
        <div class="status-item">
          <span class="status-dot" :class="weatherStore.currentWeather ? 'dot--green' : 'dot--gray'"></span>
          <span>{{ weatherStore.currentWeather ? 'Data cuaca tersedia' : 'Memuat cuaca...' }}</span>
        </div>
        <div class="status-item">
          <span class="status-dot dot--green"></span>
          <span>Open-Meteo API</span>
        </div>
        <div class="status-item">
          <span class="status-dot dot--green"></span>
          <span>OpenStreetMap</span>
        </div>
      </section>

      <!-- ── Weather panel ── -->
      <section aria-label="Informasi cuaca terkini">
        <WeatherPanel />
      </section>

      <!-- ── Quick links ── -->
      <nav aria-label="Tautan cepat fitur utama">
        <h2 class="section-title">Fitur Utama</h2>
        <ul class="quicklinks" role="list">
          <li v-for="link in quickLinks" :key="link.to">
            <RouterLink :to="link.to" class="quicklink-card" :aria-label="link.aria">
              <span class="quicklink-icon" aria-hidden="true">{{ link.icon }}</span>
              <span class="quicklink-label">{{ link.label }}</span>
              <span class="quicklink-desc">{{ link.desc }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- ── Disaster awareness ── -->
      <section aria-label="Jenis bencana di Indonesia">
        <h2 class="section-title">Ancaman Bencana di Indonesia</h2>
        <div class="disaster-grid">
          <div v-for="d in disasters" :key="d.type" class="disaster-card" :style="{ borderTopColor: d.color }">
            <span class="disaster-icon" aria-hidden="true">{{ d.icon }}</span>
            <div>
              <p class="disaster-type">{{ d.type }}</p>
              <p class="disaster-desc">{{ d.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Emergency numbers ── -->
      <section aria-label="Nomor darurat penting">
        <h2 class="section-title">📞 Nomor Darurat</h2>
        <div class="emergency-grid">
          <a
            v-for="contact in emergencyContacts"
            :key="contact.number"
            :href="`tel:${contact.number}`"
            class="emergency-card"
            :aria-label="`Hubungi ${contact.name} di nomor ${contact.number}`"
          >
            <span class="emergency-icon" aria-hidden="true">{{ contact.icon }}</span>
            <div class="emergency-info">
              <span class="emergency-name">{{ contact.name }}</span>
              <span class="emergency-number">{{ contact.number }}</span>
            </div>
          </a>
        </div>
      </section>

      <!-- ── Tips siaga ── -->
      <section aria-label="Tips kesiapsiagaan">
        <h2 class="section-title">💡 Tips Kesiapsiagaan</h2>
        <div class="tips-row">
          <div v-for="tip in prepTips" :key="tip.title" class="tip-card">
            <span class="tip-icon" aria-hidden="true">{{ tip.icon }}</span>
            <p class="tip-title">{{ tip.title }}</p>
            <p class="tip-desc">{{ tip.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ── CTA banner ── -->
      <section class="cta-banner" aria-label="Ajakan bertindak">
        <div class="cta-content">
          <span aria-hidden="true">🚨</span>
          <div>
            <p class="cta-title">Siap menghadapi bencana?</p>
            <p class="cta-sub">Pelajari prosedur evakuasi dan lokasi pengungsian terdekat sekarang.</p>
          </div>
          <RouterLink to="/safety" class="cta-btn">Lihat Panduan →</RouterLink>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRiskStore } from '@/stores/riskStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { useLocationStore } from '@/stores/locationStore'
import RiskBadge from '@/components/RiskBadge.vue'
import WeatherPanel from '@/components/WeatherPanel.vue'
import EmergencyBanner from '@/components/EmergencyBanner.vue'

const riskStore = useRiskStore()
const weatherStore = useWeatherStore()
const locationStore = useLocationStore()
const locationError = computed(() => locationStore.error)

const quickLinks = [
  { to: '/map',             icon: '🗺️', label: 'Peta Interaktif',     desc: 'Zona risiko & evakuasi',  aria: 'Buka peta interaktif' },
  { to: '/weather',         icon: '🌤️', label: 'Prakiraan Cuaca',     desc: '7 hari ke depan',         aria: 'Lihat prakiraan cuaca' },
  { to: '/analytics',       icon: '📊', label: 'Analitik Risiko',      desc: 'Tren & statistik',        aria: 'Lihat analitik risiko' },
  { to: '/evacuation-route',icon: '🚨', label: 'Jalur Evakuasi',       desc: 'Rute tercepat',           aria: 'Lihat jalur evakuasi' },
  { to: '/safety',          icon: '🛟', label: 'Panduan Keselamatan',  desc: 'Prosedur & tips',         aria: 'Panduan keselamatan' },
  { to: '/about',           icon: 'ℹ️', label: 'Tentang Aplikasi',     desc: 'Info & teknologi',        aria: 'Tentang aplikasi' },
]

const disasters = [
  { icon: '🌊', type: 'Banjir',           color: '#1565c0', desc: 'Bencana paling sering terjadi di Indonesia, terutama saat musim hujan.' },
  { icon: '🏔️', type: 'Gempa Bumi',       color: '#b71c1c', desc: 'Indonesia berada di Cincin Api Pasifik, sangat rawan gempa bumi.' },
  { icon: '🌋', type: 'Gunung Berapi',     color: '#e65100', desc: 'Indonesia memiliki 127 gunung berapi aktif, terbanyak di dunia.' },
  { icon: '🌏', type: 'Tsunami',           color: '#0277bd', desc: 'Gempa bawah laut dapat memicu tsunami yang menghancurkan wilayah pesisir.' },
  { icon: '⛰️', type: 'Tanah Longsor',    color: '#4e342e', desc: 'Curah hujan tinggi di daerah perbukitan memicu longsor yang mematikan.' },
  { icon: '🌪️', type: 'Angin Puting Beliung', color: '#546e7a', desc: 'Angin kencang berputar yang dapat merusak bangunan dan infrastruktur.' },
]

const emergencyContacts = [
  { icon: '🚔', name: 'Polisi',       number: '110' },
  { icon: '🚑', name: 'Ambulans',     number: '119' },
  { icon: '🚒', name: 'Damkar',       number: '113' },
  { icon: '🆘', name: 'BNPB',         number: '117' },
  { icon: '⛑️', name: 'Basarnas',     number: '115' },
  { icon: '🏥', name: 'BPJS Kesehatan', number: '1500400' },
]

const prepTips = [
  { icon: '🎒', title: 'Siapkan Tas Darurat', desc: 'Isi dengan air, makanan, obat, dokumen, dan senter. Simpan di tempat mudah dijangkau.' },
  { icon: '📍', title: 'Kenali Jalur Evakuasi', desc: 'Pelajari rute evakuasi dari rumah, sekolah, dan tempat kerja Anda.' },
  { icon: '📱', title: 'Simpan Nomor Darurat', desc: 'Catat nomor BPBD, polisi, dan rumah sakit terdekat di ponsel dan kertas.' },
  { icon: '👨‍👩‍👧', title: 'Buat Rencana Keluarga', desc: 'Tentukan titik kumpul dan kontak penghubung jika keluarga terpisah saat bencana.' },
]
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  background: #f0f4f8;
}

/* ── Hero ── */
.hero {
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 55%, #1976d2 100%);
  color: #fff;
  padding: 2.5rem 1.25rem 3rem;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 40px;
  background: #f0f4f8;
  clip-path: ellipse(55% 100% at 50% 100%);
}

.hero-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.hero-text { flex: 1; min-width: 260px; }

.hero-badge-row { margin-bottom: 0.75rem; }

.hero-badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 0.3rem 0.875rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.03em;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.65;
  max-width: 440px;
  margin: 0 0 1.5rem;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff;
  color: #1565c0;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;
  min-height: 44px;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.2); }

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  min-height: 44px;
  transition: background 0.15s;
}

.btn-hero-secondary:hover { background: rgba(255,255,255,0.25); }

/* Hero cards */
.hero-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 180px;
}

.risk-card, .weather-snap {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.1rem 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.card-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.weather-snap-temp {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.weather-snap-detail {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.8);
}

.location-error { font-size: 0.78rem; color: #ffcdd2; max-width: 180px; }
.location-hint  { font-size: 0.78rem; color: rgba(255,255,255,0.55); }

/* ── Body ── */
.home-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem;
}

/* ── Status bar ── */
.status-bar {
  background: #fff;
  border-radius: 12px;
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;
}

.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot--green { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
.dot--gray  { background: #94a3b8; }

/* ── Quick links ── */
.quicklinks {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
  gap: 0.875rem;
}

.quicklink-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  text-decoration: none;
  color: #1a202c;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  min-height: 44px;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.quicklink-card:hover, .quicklink-card:focus-visible {
  box-shadow: 0 4px 16px rgba(21,101,192,0.18);
  transform: translateY(-3px);
  border-color: #90caf9;
  outline: none;
}

.quicklink-icon { font-size: 2rem; line-height: 1; }
.quicklink-label { font-size: 0.875rem; font-weight: 700; color: #1a202c; }
.quicklink-desc  { font-size: 0.72rem; color: #64748b; }

/* ── Disaster grid ── */
.disaster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.875rem;
}

.disaster-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.125rem;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
  border-top: 4px solid transparent;
}

.disaster-icon { font-size: 1.75rem; flex-shrink: 0; line-height: 1; margin-top: 0.1rem; }
.disaster-type { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin: 0 0 0.25rem; }
.disaster-desc { font-size: 0.8rem; color: #64748b; margin: 0; line-height: 1.45; }

/* ── Emergency numbers ── */
.emergency-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
}

.emergency-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
  min-height: 44px;
  transition: background 0.15s, border-color 0.15s;
}

.emergency-card:hover, .emergency-card:focus-visible {
  background: #fff5f5;
  border-color: #feb2b2;
  outline: 2px solid #b71c1c;
  outline-offset: 2px;
}

.emergency-icon { font-size: 1.5rem; flex-shrink: 0; }
.emergency-info { display: flex; flex-direction: column; gap: 0.1rem; }
.emergency-name { font-size: 0.78rem; color: #64748b; font-weight: 500; }
.emergency-number { font-size: 1rem; font-weight: 800; color: #b71c1c; }

/* ── Tips ── */
.tips-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.875rem;
}

.tip-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tip-icon  { font-size: 1.75rem; line-height: 1; }
.tip-title { font-size: 0.9rem; font-weight: 700; color: #1a202c; margin: 0; }
.tip-desc  { font-size: 0.8rem; color: #64748b; margin: 0; line-height: 1.5; }

/* ── CTA banner ── */
.cta-banner {
  background: linear-gradient(135deg, #b71c1c, #c62828);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(183,28,28,0.25);
}

.cta-content {
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  color: #fff;
}

.cta-content > span { font-size: 2.5rem; flex-shrink: 0; }
.cta-content > div { flex: 1; min-width: 180px; }
.cta-title { font-size: 1rem; font-weight: 800; color: #fff; margin: 0 0 0.25rem; }
.cta-sub   { font-size: 0.85rem; color: rgba(255,255,255,0.8); margin: 0; }

.cta-btn {
  display: inline-flex;
  align-items: center;
  background: #fff;
  color: #b71c1c;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  min-height: 44px;
  white-space: nowrap;
  transition: opacity 0.15s, transform 0.15s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.cta-btn:hover { opacity: 0.92; transform: translateY(-1px); }

@media (max-width: 640px) {
  .hero-inner    { flex-direction: column; align-items: flex-start; }
  .hero-cards    { width: 100%; flex-direction: row; }
  .risk-card, .weather-snap { flex: 1; }
  .disaster-grid { grid-template-columns: 1fr; }
  .tips-row      { grid-template-columns: repeat(2, 1fr); }
  .emergency-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 400px) {
  .tips-row      { grid-template-columns: 1fr; }
  .hero-cards    { flex-direction: column; }
}
</style>
