<template>
  <div class="about-page">
    <div class="about-inner">

      <!-- Hero -->
      <section class="about-hero">
        <span class="about-logo" aria-hidden="true">🛡️</span>
        <h1 class="about-title">SafeRoute</h1>
        <p class="about-version">Versi 1.0.0</p>
        <p class="about-tagline">Platform kesiapsiagaan bencana berbasis web untuk masyarakat umum</p>
      </section>

      <!-- Deskripsi -->
      <section class="about-section">
        <h2 class="section-title">Tentang Aplikasi</h2>
        <p class="about-desc">
          SafeRoute adalah platform web interaktif yang membantu masyarakat menghadapi situasi bencana
          dengan menyediakan informasi risiko real-time, panduan evakuasi, dan pemantauan cuaca berbasis
          lokasi pengguna. Seluruh fitur berjalan di sisi klien tanpa biaya berlangganan.
        </p>
      </section>

      <!-- Fitur -->
      <section class="about-section">
        <h2 class="section-title">Fitur Utama</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <span class="feature-icon" aria-hidden="true">{{ feature.icon }}</span>
            <div>
              <p class="feature-title">{{ feature.title }}</p>
              <p class="feature-desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Teknologi -->
      <section class="about-section">
        <h2 class="section-title">Teknologi yang Digunakan</h2>
        <div class="tech-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-card">
            <span class="tech-icon" aria-hidden="true">{{ tech.icon }}</span>
            <div>
              <p class="tech-name">{{ tech.name }}</p>
              <p class="tech-desc">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Sumber data -->
      <section class="about-section">
        <h2 class="section-title">Sumber Data</h2>
        <div class="source-list">
          <div v-for="source in dataSources" :key="source.name" class="source-item">
            <span class="source-icon" aria-hidden="true">{{ source.icon }}</span>
            <div>
              <p class="source-name">{{ source.name }}</p>
              <p class="source-desc">{{ source.desc }}</p>
            </div>
            <a
              v-if="source.url"
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
              :aria-label="`Kunjungi ${source.name}`"
            >↗</a>
          </div>
        </div>
      </section>

      <!-- Link ke panduan -->
      <section class="about-section">
        <div class="cta-card">
          <span aria-hidden="true">🛟</span>
          <div>
            <p class="cta-title">Butuh panduan keselamatan?</p>
            <p class="cta-desc">Lihat prosedur evakuasi, lokasi pengungsian, dan tips keselamatan bencana.</p>
          </div>
          <RouterLink to="/safety" class="cta-btn">Panduan Keselamatan →</RouterLink>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
const features = [
  { icon: '🗺️', title: 'Peta Interaktif', desc: 'Visualisasi zona risiko dan titik evakuasi berbasis Leaflet.js' },
  { icon: '🌤️', title: 'Cuaca Real-Time', desc: 'Data cuaca dan prakiraan 7 hari dari Open-Meteo API' },
  { icon: '⚠️', title: 'Deteksi Risiko', desc: 'Kalkulasi risiko lokal otomatis berdasarkan curah hujan' },
  { icon: '🚨', title: 'Notifikasi Darurat', desc: 'Peringatan browser otomatis saat risiko terdeteksi tinggi' },
  { icon: '📊', title: 'Analitik Risiko', desc: 'Grafik tren curah hujan dan distribusi risiko historis' },
  { icon: '🛟', title: 'Panduan Keselamatan', desc: 'Prosedur evakuasi, lokasi pengungsian, dan tips darurat' },
]

const techStack = [
  { icon: '💚', name: 'Vue.js 3', desc: 'Framework UI dengan Composition API' },
  { icon: '🍍', name: 'Pinia', desc: 'State management ringan untuk Vue' },
  { icon: '🗺️', name: 'Leaflet.js', desc: 'Library peta interaktif open-source' },
  { icon: '📈', name: 'Chart.js', desc: 'Visualisasi grafik data analitik' },
  { icon: '⚡', name: 'Vite', desc: 'Build tool modern yang cepat' },
  { icon: '🧪', name: 'Vitest + fast-check', desc: 'Unit test dan property-based testing' },
]

const dataSources = [
  { icon: '🌦️', name: 'Open-Meteo', desc: 'Data cuaca real-time dan prakiraan gratis tanpa API key', url: 'https://open-meteo.com' },
  { icon: '🗺️', name: 'OpenStreetMap', desc: 'Tile peta dunia open-source', url: 'https://www.openstreetmap.org' },
  { icon: '🛣️', name: 'OSRM (via Leaflet Routing Machine)', desc: 'Kalkulasi rute evakuasi gratis', url: 'https://project-osrm.org' },
]
</script>

<style scoped>
.about-page {
  min-height: calc(100vh - 64px);
  background: #f0f4f8;
  padding-bottom: 3rem;
}

.about-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 0;
}

/* Hero */
.about-hero {
  background: linear-gradient(135deg, #0d47a1, #1565c0, #1976d2);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(13,71,161,0.25);
}

.about-logo { font-size: 3.5rem; display: block; margin-bottom: 0.5rem; }
.about-title { font-size: 2rem; font-weight: 900; color: #fff; margin: 0 0 0.25rem; }
.about-version { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin: 0 0 0.75rem; }
.about-tagline { font-size: 0.95rem; color: rgba(255,255,255,0.85); margin: 0; max-width: 400px; margin: 0 auto; line-height: 1.5; }

/* Sections */
.about-section { margin-bottom: 1.5rem; }

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.875rem;
}

.about-desc {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.7;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
  margin: 0;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.125rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.feature-icon { font-size: 1.5rem; flex-shrink: 0; line-height: 1; margin-top: 0.1rem; }
.feature-title { font-size: 0.875rem; font-weight: 700; color: #1a202c; margin: 0 0 0.2rem; }
.feature-desc { font-size: 0.8rem; color: #64748b; margin: 0; line-height: 1.4; }

/* Tech */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.tech-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.tech-icon { font-size: 1.5rem; flex-shrink: 0; }
.tech-name { font-size: 0.875rem; font-weight: 700; color: #1a202c; margin: 0 0 0.15rem; }
.tech-desc { font-size: 0.78rem; color: #64748b; margin: 0; }

/* Sources */
.source-list { display: flex; flex-direction: column; gap: 0.625rem; }

.source-item {
  background: #fff;
  border-radius: 12px;
  padding: 0.875rem 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.source-icon { font-size: 1.5rem; flex-shrink: 0; }
.source-item > div { flex: 1; }
.source-name { font-size: 0.875rem; font-weight: 700; color: #1a202c; margin: 0 0 0.15rem; }
.source-desc { font-size: 0.78rem; color: #64748b; margin: 0; }

.source-link {
  font-size: 1rem;
  color: #1565c0;
  text-decoration: none;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.15s;
}

.source-link:hover { background: #eff6ff; }

/* CTA */
.cta-card {
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
  border: 1px solid #a5d6a7;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-card > span { font-size: 2rem; flex-shrink: 0; }
.cta-card > div { flex: 1; min-width: 160px; }
.cta-title { font-size: 0.95rem; font-weight: 700; color: #1b5e20; margin: 0 0 0.2rem; }
.cta-desc { font-size: 0.82rem; color: #2e7d32; margin: 0; }

.cta-btn {
  display: inline-flex;
  align-items: center;
  background: #2e7d32;
  color: #fff;
  border-radius: 10px;
  padding: 0.6rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  min-height: 44px;
  white-space: nowrap;
  transition: background 0.15s;
}

.cta-btn:hover { background: #1b5e20; }

@media (max-width: 480px) {
  .features-grid, .tech-grid { grid-template-columns: 1fr; }
  .about-hero { padding: 2rem 1.25rem; }
}
</style>
