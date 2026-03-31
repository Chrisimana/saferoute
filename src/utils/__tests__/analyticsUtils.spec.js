import fc from 'fast-check'
import { test } from 'vitest'
import { calculateRiskDistribution, calculateStats } from '@/utils/analyticsUtils'

const riskRecordArb = fc.record({
  timestamp: fc.integer({ min: 0, max: 4102444800000 }).map((ms) => new Date(ms).toISOString()),
  riskLevel: fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
  precipitation: fc.float({ min: 0, max: 200, noNaN: true }),
  temperature: fc.float({ min: -10, max: 50, noNaN: true }),
  humidity: fc.float({ min: 0, max: 100, noNaN: true }),
})

test('calculateRiskDistribution: jumlah Rendah + Sedang + Tinggi sama dengan panjang array input', () => {
  fc.assert(
    fc.property(fc.array(riskRecordArb), (records) => {
      const dist = calculateRiskDistribution(records)
      return dist.Rendah + dist.Sedang + dist.Tinggi === records.length
    }),
    { numRuns: 100 }
  )
})

test('calculateStats: averageRisk adalah rata-rata nilai numerik risiko dari semua record', () => {
  fc.assert(
    fc.property(fc.array(riskRecordArb, { minLength: 1 }), (records) => {
      const RISK_VALUE = { Rendah: 1, Sedang: 2, Tinggi: 3 }
      const expectedAvg = records.reduce((sum, r) => sum + RISK_VALUE[r.riskLevel], 0) / records.length
      const { averageRisk } = calculateStats(records)
      return Math.abs(averageRisk - expectedAvg) < 1e-9
    }),
    { numRuns: 100 }
  )
})

test('calculateStats: highRiskCount sama dengan jumlah record dengan riskLevel Tinggi', () => {
  fc.assert(
    fc.property(fc.array(riskRecordArb, { minLength: 1 }), (records) => {
      const expectedCount = records.filter((r) => r.riskLevel === 'Tinggi').length
      const { highRiskCount } = calculateStats(records)
      return highRiskCount === expectedCount
    }),
    { numRuns: 100 }
  )
})

test('calculateStats: lastUpdated adalah timestamp terbaru dari semua record', () => {
  fc.assert(
    fc.property(fc.array(riskRecordArb, { minLength: 1 }), (records) => {
      const expectedLatest = records.reduce((latest, r) =>
        r.timestamp > latest ? r.timestamp : latest,
        records[0].timestamp
      )
      const { lastUpdated } = calculateStats(records)
      return lastUpdated === expectedLatest
    }),
    { numRuns: 100 }
  )
})
