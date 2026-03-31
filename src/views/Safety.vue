<template>
  <div class="safety-page">
    <div class="safety-inner">

      <!-- Header -->
      <header class="page-header">
        <h1 class="page-title">🛟 Panduan Keselamatan</h1>
        <p class="page-subtitle">Prosedur evakuasi, lokasi pengungsian, dan tips keselamatan bencana</p>
      </header>

      <!-- Tab navigation -->
      <nav class="tab-nav" aria-label="Navigasi panduan keselamatan">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
          :aria-selected="activeTab === tab.id"
          role="tab"
        >
          <span aria-hidden="true">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </nav>

      <!-- ── Tab Prosedur Evakuasi ── -->
      <section v-if="activeTab === 'prosedur'" aria-label="Prosedur evakuasi">
        <div class="procedures-grid">
          <div
            v-for="procedure in evacuationProcedures"
            :key="procedure.id"
            class="procedure-card"
          >
            <div class="card-header">
              <span class="card-icon" aria-hidden="true">{{ procedure.icon }}</span>
              <h2 class="card-title">{{ procedure.type }}</h2>
            </div>
            <ol class="steps-list">
              <li v-for="(step, i) in procedure.steps" :key="i">{{ step }}</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- ── Tab Lokasi Pengungsian ── -->
      <section v-else-if="activeTab === 'pengungsian'" aria-label="Lokasi pengungsian">
        <div class="filter-row">
          <label for="province-select" class="filter-label">Filter Provinsi:</label>
          <select id="province-select" v-model="selectedProvince" class="province-select">
            <option v-for="prov in provinces" :key="prov" :value="prov">{{ prov }}</option>
          </select>
          <span class="filter-count">{{ filteredPoints.length }} lokasi</span>
        </div>
        <p class="section-hint">Klik lokasi untuk melihat di peta interaktif</p>
        <div class="shelters-list">
          <button
            v-for="point in filteredPoints"
            :key="point.id"
            class="shelter-card"
            @click="goToMap(point)"
            :aria-label="`Lihat ${point.name} di peta`"
          >
            <div class="shelter-left">
              <span class="shelter-icon" aria-hidden="true">🏠</span>
              <div class="shelter-details">
                <strong class="shelter-name">{{ point.name }}</strong>
                <span class="shelter-province">{{ point.province }}</span>
                <span class="shelter-address">{{ point.address }}</span>
                <span class="shelter-capacity">
                  👥 Kapasitas: {{ point.capacity.toLocaleString('id-ID') }} orang
                </span>
              </div>
            </div>
            <span class="shelter-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <!-- ── Tab Tips Keselamatan ── -->
      <section v-else-if="activeTab === 'tips'" aria-label="Tips keselamatan">
        <div class="tips-grid">

          <div class="tips-card">
            <div class="tips-header">
              <span aria-hidden="true">🎒</span>
              <h2>Tas Darurat</h2>
            </div>
            <p class="tips-intro">Siapkan tas darurat yang mudah dijangkau berisi:</p>
            <ul class="tips-list">
              <li>Air minum (minimal 3 liter per orang)</li>
              <li>Makanan tahan lama (biskuit, sarden, mie instan)</li>
              <li>Obat-obatan pribadi dan P3K dasar</li>
              <li>Senter dan baterai cadangan</li>
              <li>Pakaian ganti dan jas hujan</li>
              <li>Dokumen penting (KTP, KK, buku tabungan) dalam plastik kedap air</li>
              <li>Uang tunai secukupnya</li>
              <li>Peluit darurat</li>
              <li>Masker dan hand sanitizer</li>
              <li>Power bank dan kabel charger</li>
            </ul>
          </div>

          <div class="tips-card">
            <div class="tips-header">
              <span aria-hidden="true">📞</span>
              <h2>Nomor Darurat</h2>
            </div>
            <div class="emergency-list">
              <div
                v-for="contact in emergencyContacts"
                :key="contact.number"
                class="emergency-item"
              >
                <span class="contact-name">{{ contact.name }}</span>
                <a
                  :href="`tel:${contact.number}`"
                  class="contact-number"
                  :aria-label="`Hubungi ${contact.name} di nomor ${contact.number}`"
                >{{ contact.number }}</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Tab Komunikasi Keluarga ── -->
      <section v-else-if="activeTab === 'komunikasi'" aria-label="Prosedur komunikasi keluarga">
        <div class="comm-card">
          <div class="tips-header">
            <span aria-hidden="true">👨‍👩‍👧‍👦</span>
            <h2>Prosedur Komunikasi Keluarga</h2>
          </div>
          <ol class="steps-list steps-list--numbered">
            <li>Tentukan titik kumpul keluarga di dekat rumah dan di luar lingkungan rumah.</li>
            <li>Pilih satu anggota keluarga di luar kota sebagai kontak penghubung utama.</li>
            <li>Pastikan semua anggota keluarga hafal nomor telepon kontak penghubung.</li>
            <li>Latih seluruh anggota keluarga (termasuk anak-anak) cara menghubungi kontak darurat.</li>
            <li>Simpan nomor darurat di tempat yang mudah diakses, bukan hanya di ponsel.</li>
            <li>Gunakan SMS jika panggilan telepon tidak bisa tersambung saat bencana.</li>
            <li>Tetapkan jadwal check-in rutin jika terpisah dari keluarga saat bencana terjadi.</li>
            <li>Informasikan rencana evakuasi kepada tetangga dan komunitas sekitar.</li>
          </ol>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import evacuationProcedures from '@/data/evacuationProcedures'
import evacuationPoints from '@/data/evacuationPoints'

const router = useRouter()
const activeTab = ref('prosedur')
const selectedProvince = ref('Semua')

const tabs = [
  { id: 'prosedur',    icon: '📋', label: 'Prosedur Evakuasi' },
  { id: 'pengungsian', icon: '🏠', label: 'Lokasi Pengungsian' },
  { id: 'tips',        icon: '💡', label: 'Tips Keselamatan' },
  { id: 'komunikasi',  icon: '📡', label: 'Komunikasi Keluarga' },
]

const provinces = computed(() => {
  const all = [...new Set(evacuationPoints.map(p => p.province))].sort()
  return ['Semua', ...all]
})

const filteredPoints = computed(() => {
  if (selectedProvince.value === 'Semua') return evacuationPoints
  return evacuationPoints.filter(p => p.province === selectedProvince.value)
})

const emergencyContacts = [
  { name: 'Polisi',                                    number: '110' },
  { name: 'Ambulans',                                  number: '118 / 119' },
  { name: 'Pemadam Kebakaran',                         number: '113' },
  { name: 'BNPB (Badan Nasional Penanggulangan Bencana)', number: '117' },
  { name: 'SAR Nasional (Basarnas)',                   number: '115' },
]

function goToMap(point) {
  router.push({ path: '/map', query: { pointId: point.id } })
}
</script>

<style scoped>
.safety-page {
  min-height: calc(100vh - 64px);
  background: #f0f4f8;
  padding-bottom: 3rem;
}

.safety-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 0;
}

/* Header */
.page-header { margin-bottom: 1.5rem; }
.page-title { font-size: 1.5rem; font-weight: 800; color: #1a202c; margin: 0 0 0.4rem; }
.page-subtitle { font-size: 0.95rem; color: #64748b; margin: 0; }

/* Tabs */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  background: #fff;
  border-radius: 14px;
  padding: 0.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 10px;
  background: none;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.tab-btn:hover { background: #f1f5f9; color: #1a202c; }

.tab-btn--active {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: #fff;
}

/* Procedures */
.procedures-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) { .procedures-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .procedures-grid { grid-template-columns: repeat(3, 1fr); } }

.procedure-card, .tips-card, .comm-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

.card-header, .tips-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.card-icon, .tips-header span { font-size: 1.75rem; line-height: 1; flex-shrink: 0; }

.card-title, .tips-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.steps-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.65;
}

.steps-list li { margin-bottom: 0.4rem; }

/* Shelters */
.filter-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.province-select {
  flex: 1;
  min-width: 180px;
  max-width: 320px;
  padding: 0.5rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #1a202c;
  background: #fff;
  min-height: 44px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
}

.province-select:focus { border-color: #1565c0; box-shadow: 0 0 0 2px rgba(21,101,192,0.15); }

.filter-count {
  font-size: 0.8rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  white-space: nowrap;
}

.section-hint { font-size: 0.875rem; color: #64748b; margin: 0 0 1rem; }

.shelters-list { display: flex; flex-direction: column; gap: 0.75rem; }

.shelter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  text-align: left;
  width: 100%;
  min-height: 44px;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.shelter-card:hover, .shelter-card:focus-visible {
  background: #eff6ff;
  border-color: #1565c0;
  box-shadow: 0 2px 8px rgba(21,101,192,0.12);
  outline: 2px solid #1565c0;
  outline-offset: 2px;
}

.shelter-left { display: flex; align-items: flex-start; gap: 0.75rem; }
.shelter-icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; margin-top: 0.1rem; }
.shelter-details { display: flex; flex-direction: column; gap: 0.2rem; }
.shelter-name { font-size: 0.95rem; font-weight: 700; color: #1a202c; }
.shelter-province {
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: #1565c0;
  border-radius: 20px;
  padding: 1px 8px;
  display: inline-block;
  width: fit-content;
}
.shelter-address { font-size: 0.82rem; color: #64748b; }
.shelter-capacity { font-size: 0.82rem; color: #1565c0; font-weight: 600; }
.shelter-arrow { font-size: 1.1rem; color: #1565c0; flex-shrink: 0; margin-left: 0.5rem; }

/* Tips */
.tips-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 700px) { .tips-grid { grid-template-columns: repeat(2, 1fr); } }

.tips-intro { font-size: 0.875rem; color: #475569; margin: 0 0 0.75rem; }

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.65;
}

.tips-list li { margin-bottom: 0.35rem; }

/* Emergency */
.emergency-list { display: flex; flex-direction: column; gap: 0.5rem; }

.emergency-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.875rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.contact-name { font-size: 0.875rem; color: #374151; }

.contact-number {
  font-size: 1rem;
  font-weight: 800;
  color: #b71c1c;
  text-decoration: none;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 0.25rem;
  border-radius: 4px;
}

.contact-number:hover, .contact-number:focus-visible {
  text-decoration: underline;
  outline: 2px solid #b71c1c;
  outline-offset: 2px;
}

/* Communication */
.comm-card { max-width: 700px; }

.steps-list--numbered { list-style: decimal; }

@media (max-width: 480px) {
  .tab-btn { font-size: 0.8rem; padding: 0.5rem 0.75rem; }
  .tab-nav { gap: 0.35rem; }
}
</style>
