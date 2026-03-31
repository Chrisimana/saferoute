import fc from 'fast-check'
import { describe, test, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EvacuationMarker from '@/components/EvacuationMarker.vue'

let capturedIconHtml = ''

vi.mock('leaflet', () => {
  const mockMarker = {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    remove: vi.fn(),
  }
  return {
    default: {
      divIcon: vi.fn(({ html }) => {
        capturedIconHtml = html ?? ''
        return {}
      }),
      marker: vi.fn(() => mockMarker),
    },
  }
})

const evacuationPointArb = fc.record({
  id: fc.integer({ min: 1, max: 9999 }),
  name: fc.string({ minLength: 1, maxLength: 80 }).filter(s => s.trim().length > 0),
  address: fc.string({ minLength: 1, maxLength: 120 }),
  capacity: fc.integer({ min: 1, max: 100_000 }),
  coordinates: fc.record({
    lat: fc.float({ min: -90, max: 90, noNaN: true }),
    lon: fc.float({ min: -180, max: 180, noNaN: true }),
  }),
})

function extractAriaLabel(html) {
  const match = html.match(/aria-label\s*=\s*"([^"]*)"/)
  if (!match) return null
  return match[1] 
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function extractAlt(html) {
  const match = html.match(/\balt\s*=\s*["']([^"']*)["']/)
  if (!match) return null
  return match[1].trim()
}

const mockMap = {
  addLayer: vi.fn(),
  removeLayer: vi.fn(),
}

describe('Property 18: Elemen Ikon Memiliki Label Aksesibilitas', () => {
  beforeEach(() => {
    capturedIconHtml = ''
    vi.clearAllMocks()
  })

  test(
    'Setiap ikon marker EvacuationMarker memiliki aria-label atau alt yang tidak kosong untuk sembarang EvacuationPoint',
    () => {
      fc.assert(
        fc.property(evacuationPointArb, (point) => {
          capturedIconHtml = ''

          mount(EvacuationMarker, {
            props: { point },
            global: {
              provide: {
                leafletMap: mockMap,
              },
            },
          })

          const ariaLabel = extractAriaLabel(capturedIconHtml)
          const alt = extractAlt(capturedIconHtml)

          const hasAccessibleLabel =
            (ariaLabel !== null && ariaLabel.length > 0) ||
            (alt !== null && alt.length > 0)

          return hasAccessibleLabel
        }),
        { numRuns: 100 }
      )
    }
  )

  test(
    'aria-label ikon marker mengandung nama titik evakuasi untuk sembarang EvacuationPoint',
    () => {
      fc.assert(
        fc.property(evacuationPointArb, (point) => {
          capturedIconHtml = ''

          mount(EvacuationMarker, {
            props: { point },
            global: {
              provide: {
                leafletMap: mockMap,
              },
            },
          })

          const ariaLabel = extractAriaLabel(capturedIconHtml)

          const decodedLabel = ariaLabel !== null ? decodeHtmlEntities(ariaLabel) : null
          return decodedLabel !== null && decodedLabel.includes(point.name.trim())
        }),
        { numRuns: 100 }
      )
    }
  )
})
