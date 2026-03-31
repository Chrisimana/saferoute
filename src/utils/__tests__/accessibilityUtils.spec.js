import { describe, test, expect } from 'vitest'
import fc from 'fast-check'
import { calculateContrastRatio } from '../accessibilityUtils.js'

const hexChar = fc.constantFrom(
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f',
  'A', 'B', 'C', 'D', 'E', 'F'
)

const hexColor6 = fc
  .array(hexChar, { minLength: 6, maxLength: 6 })
  .map(chars => '#' + chars.join(''))

describe('Property 17: Rasio Kontras Warna Memenuhi Standar Aksesibilitas', () => {
  test('rasio kontras selalu berada dalam rentang WCAG yang valid [1, 21]', () => {
    fc.assert(
      fc.property(hexColor6, hexColor6, (fg, bg) => {
        const ratio = calculateContrastRatio(fg, bg)
        return ratio >= 1.0 && ratio <= 21.0
      }),
      { numRuns: 100 }
    )
  })

  test('menukar fg dan bg menghasilkan rasio kontras yang sama (simetri)', () => {
    fc.assert(
      fc.property(hexColor6, hexColor6, (fg, bg) => {
        const ratio1 = calculateContrastRatio(fg, bg)
        const ratio2 = calculateContrastRatio(bg, fg)
        return Math.abs(ratio1 - ratio2) < 1e-10
      }),
      { numRuns: 100 }
    )
  })

  describe('pasangan warna kritis aplikasi dengan teks putih (#FFFFFF)', () => {
    const WHITE = '#FFFFFF'
    const BLACK = '#000000'

    const riskColors = [
      { name: 'Rendah (hijau)', hex: '#4CAF50' },
      { name: 'Sedang (kuning)', hex: '#FFEB3B' },
      { name: 'Tinggi (merah)', hex: '#F44336' },
    ]

    riskColors.forEach(({ name, hex }) => {
      test(`warna risiko ${name} (${hex}) memiliki rasio kontras ≥ 4.5:1 dengan teks hitam atau putih`, () => {
        const ratioWithWhite = calculateContrastRatio(WHITE, hex)
        const ratioWithBlack = calculateContrastRatio(BLACK, hex)
        const meetsAA = ratioWithWhite >= 4.5 || ratioWithBlack >= 4.5
        expect(meetsAA).toBe(true)
      })
    })

    test('warna risiko Tinggi (#F44336) memenuhi rasio kontras ≥ 4.5:1 dengan teks hitam', () => {
      const ratio = calculateContrastRatio(BLACK, '#F44336')
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })

    test('warna risiko Rendah (#4CAF50) memenuhi rasio kontras ≥ 4.5:1 dengan teks hitam', () => {
      const ratio = calculateContrastRatio(BLACK, '#4CAF50')
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })
  })

  test('warna yang sama dengan dirinya sendiri selalu menghasilkan rasio kontras = 1', () => {
    fc.assert(
      fc.property(hexColor6, (color) => {
        const ratio = calculateContrastRatio(color, color)
        return Math.abs(ratio - 1.0) < 1e-10
      }),
      { numRuns: 100 }
    )
  })
})
