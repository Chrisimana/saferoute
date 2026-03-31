<template>
  <!-- SafeRoute Analytics — Requirements: 6.1, 6.2, 6.4, 6.5, 6.6 -->
  <div class="analytics-page">
    <div class="analytics-inner">
      <h1 class="page-title">📊 Analitik Risiko</h1>

      <!-- Empty state -->
      <div v-if="!hasData" class="empty-card" role="status">
        <span aria-hidden="true">📭</span>
        <p>Belum ada data historis. Kunjungi kembali setelah beberapa saat.</p>
      </div>

      <template v-else>
        <!-- Stats row -->
        <section class="stats-grid" aria-label="Ringkasan statistik">
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">📈</span>
            <span class="stat-label">Rata-rata Risiko</span>
            <span class="stat-value">{{ avgRiskLabel }}</span>
          </div>
          <div class="stat-card stat-card--danger">
            <span class="stat-icon" aria-hidden="true">🔴</span>
            <span class="stat-label">Kejadian Risiko Tinggi</span>
            <span class="stat-value">{{ stats.highRiskCount }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">🕐</span>
            <span class="stat-label">Terakhir Diperbarui</span>
            <span class="stat-value stat-value--sm">{{ formattedLastUpdated }}</span>
          </div>
        </section>

        <!-- Line chart (Req 6.1) -->
        <section class="chart-card" aria-label="Grafik curah hujan 24 jam">
          <h2 class="chart-title">Curah Hujan — 24 Jam Terakhir</h2>
          <div class="chart-wrapper">
            <canvas ref="precipChartRef" aria-label="Grafik garis curah hujan 24 jam terakhir" role="img"></canvas>
          </div>
        </section>

        <!-- Bar chart (Req 6.2) -->
        <section class="chart-card" aria-label="Grafik distribusi tingkat risiko">
          <h2 class="chart-title">Distribusi Tingkat Risiko</h2>
          <div class="chart-wrapper">
            <canvas ref="distChartRef" aria-label="Grafik batang distribusi tingkat risiko" role="img"></canvas>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart, LineController, BarController, CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, Tooltip, Legend, Filler,
} from 'chart.js'
import { useRiskStore } from '@/stores/riskStore'
import { calculateRiskDistribution, calculateStats } from '@/utils/analyticsUtils'

Chart.register(
  LineController, BarController, CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, Tooltip, Legend, Filler,
)

const riskStore = useRiskStore()
const precipChartRef = ref(null)
const distChartRef = ref(null)
let precipChart = null
let distChart = null

const records = computed(() => riskStore.loadRiskRecords())
const hasData = computed(() => records.value.length > 0)
const stats = computed(() => calculateStats(records.value))
const distribution = computed(() => calculateRiskDistribution(records.value))

const avgRiskLabel = computed(() => {
  const v = stats.value.averageRisk
  if (v === 0) return '—'
  if (v < 1.5) return 'Rendah'
  if (v < 2.5) return 'Sedang'
  return 'Tinggi'
})

const formattedLastUpdated = computed(() => {
  if (!stats.value.lastUpdated) return '—'
  return new Date(stats.value.lastUpdated).toLocaleString('id-ID')
})

const last24hRecords = computed(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000
  return records.value
    .filter(r => new Date(r.timestamp).getTime() >= cutoff)
    .slice(-24)
})

function buildPrecipChart() {
  if (!precipChartRef.value) return
  const labels = last24hRecords.value.map(r =>
    new Date(r.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  )
  const data = last24hRecords.value.map(r => r.precipitation ?? 0)

  precipChart = new Chart(precipChartRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Curah Hujan (mm/jam)',
        data,
        borderColor: '#1565c0',
        backgroundColor: 'rgba(21,101,192,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#1565c0',
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'mm/jam' }, grid: { color: '#f1f5f9' } },
        x: { ticks: { maxTicksLimit: 8 }, grid: { display: false } },
      },
    },
  })
}

function buildDistChart() {
  if (!distChartRef.value) return
  const d = distribution.value

  distChart = new Chart(distChartRef.value, {
    type: 'bar',
    data: {
      labels: ['Rendah', 'Sedang', 'Tinggi'],
      datasets: [{
        label: 'Jumlah Kejadian',
        data: [d.Rendah, d.Sedang, d.Tinggi],
        backgroundColor: ['#2e7d32', '#f57f17', '#b71c1c'],
        borderRadius: 8,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
        x: { grid: { display: false } },
      },
    },
  })
}

onMounted(() => {
  if (hasData.value) {
    buildPrecipChart()
    buildDistChart()
  }
})

onBeforeUnmount(() => {
  precipChart?.destroy()
  distChart?.destroy()
})
</script>

<style scoped>
.analytics-page {
  min-height: calc(100vh - 64px);
  background: var(--surface-2, #f8fafc);
  padding: 1.75rem 1.25rem 3rem;
}

.analytics-inner {
  max-width: 960px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a202c;
  margin: 0 0 1.5rem;
}

.empty-card {
  background: #fff;
  border-radius: 14px;
  padding: 3rem 2rem;
  text-align: center;
  color: #64748b;
  font-size: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-card span { font-size: 2.5rem; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.875rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border-left: 4px solid #1565c0;
}

.stat-card--danger { border-left-color: #b71c1c; }

.stat-icon { font-size: 1.25rem; }

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 900;
  color: #1a202c;
}

.stat-value--sm { font-size: 0.95rem; font-weight: 600; }

/* Charts */
.chart-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-bottom: 1.25rem;
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1.25rem;
}

.chart-wrapper {
  position: relative;
  max-height: 300px;
}
</style>
