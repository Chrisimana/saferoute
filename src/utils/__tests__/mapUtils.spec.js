import fc from 'fast-check'
import { getZoneStyle, buildPopupContent, getRouteStyle } from '@/utils/mapUtils'

test('getZoneStyle mengembalikan warna yang tepat sesuai klasifikasi risiko', () => {
  const colorMap = {
    Rendah: '#4CAF50',
    Sedang: '#FFEB3B',
    Tinggi: '#F44336'
  }

  fc.assert(
    fc.property(fc.constantFrom('Rendah', 'Sedang', 'Tinggi'), (riskLevel) => {
      const style = getZoneStyle(riskLevel)
      const expectedColor = colorMap[riskLevel]
      return style.color === expectedColor && style.fillColor === expectedColor
    }),
    { numRuns: 100 }
  )
})

test('buildPopupContent mengandung name, riskLevel, dan description dari ZonaRisiko', () => {
  fc.assert(
    fc.property(
      fc.record({
        name: fc.string({ minLength: 1 }),
        riskLevel: fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
        description: fc.string({ minLength: 1 })
      }),
      ({ name, riskLevel, description }) => {
        const feature = { properties: { name, riskLevel, description } }
        const html = buildPopupContent(feature)
        return html.includes(name) && html.includes(riskLevel) && html.includes(description)
      }
    ),
    { numRuns: 100 }
  )
})

test('getRouteStyle mengembalikan style yang tepat untuk jalur utama dan alternatif', () => {
  const mainStyle = getRouteStyle(true)
  expect(mainStyle.color).toBe('#2196F3')
  expect(mainStyle.weight).toBe(5)
  expect(mainStyle.opacity).toBe(0.8)

  const altStyle = getRouteStyle(false)
  expect(altStyle.color).toBe('#B0BEC5')
  expect(altStyle.weight).toBe(3)
  expect(altStyle.opacity).toBe(0.6)
})

test('getRouteStyle selalu mengembalikan warna yang benar untuk setiap nilai boolean isMain', () => {
  fc.assert(
    fc.property(fc.boolean(), (isMain) => {
      const style = getRouteStyle(isMain)
      if (isMain) {
        return style.color === '#2196F3'
      } else {
        return style.color === '#B0BEC5'
      }
    }),
    { numRuns: 100 }
  )
})
