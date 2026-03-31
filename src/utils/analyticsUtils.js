/**
 * @param {Array<{ riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' }>} records
 * @returns {{ Rendah: number, Sedang: number, Tinggi: number }}
 */

export function calculateRiskDistribution(records) {
  const dist = { Rendah: 0, Sedang: 0, Tinggi: 0 }
  for (const record of records) {
    if (record.riskLevel in dist) {
      dist[record.riskLevel]++
    }
  }
  return dist
}

/**
 * @param {Array<{ riskLevel: 'Rendah' | 'Sedang' | 'Tinggi', timestamp: string }>} records
 * @returns {{ averageRisk: number, highRiskCount: number, lastUpdated: string | null }}
 */

export function calculateStats(records) {
  if (!records || records.length === 0) {
    return { averageRisk: 0, highRiskCount: 0, lastUpdated: null }
  }

  const RISK_VALUE = { Rendah: 1, Sedang: 2, Tinggi: 3 }

  let sum = 0
  let highRiskCount = 0
  let latestTimestamp = null

  for (const record of records) {
    sum += RISK_VALUE[record.riskLevel] ?? 0
    if (record.riskLevel === 'Tinggi') highRiskCount++
    if (!latestTimestamp || record.timestamp > latestTimestamp) {
      latestTimestamp = record.timestamp
    }
  }

  return {
    averageRisk: sum / records.length,
    highRiskCount,
    lastUpdated: latestTimestamp,
  }
}
