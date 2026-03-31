import { describe, test } from 'vitest'
import fc from 'fast-check'
import evacuationPoints from '../evacuationPoints.js'

describe('EvacuationPoint data completeness', () => {
  test('setiap EvacuationPoint memiliki semua field yang diperlukan dan tidak null atau kosong', () => {
    fc.assert(
      fc.property(fc.constantFrom(...evacuationPoints), (point) => {
        // name harus string tidak kosong
        if (typeof point.name !== 'string' || point.name.trim() === '') return false

        // address harus string tidak kosong
        if (typeof point.address !== 'string' || point.address.trim() === '') return false

        // capacity harus angka positif
        if (typeof point.capacity !== 'number' || point.capacity <= 0) return false

        // coordinates harus objek dengan lat dan lon numerik
        if (point.coordinates === null || typeof point.coordinates !== 'object') return false
        if (typeof point.coordinates.lat !== 'number') return false
        if (typeof point.coordinates.lon !== 'number') return false

        return true
      }),
      { numRuns: 100 }
    )
  })
})
