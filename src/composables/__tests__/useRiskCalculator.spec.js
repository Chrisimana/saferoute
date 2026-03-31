import fc from 'fast-check'
import { calculateRisk } from '@/composables/useRiskCalculator'

test('kalkulasi risiko sesuai threshold curah hujan', () => {
  fc.assert(
    fc.property(fc.float({ min: 0, max: 200 }), (precipitation) => {
      const result = calculateRisk({ precipitation })
      if (precipitation < 10) return result === 'Rendah'
      if (precipitation <= 30) return result === 'Sedang'
      return result === 'Tinggi'
    }),
    { numRuns: 100 }
  )
})
