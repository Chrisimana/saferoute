import fc from 'fast-check'
import { setActivePinia, createPinia } from 'pinia'
import { useRiskStore } from '@/stores/riskStore'

function makeLocalStorage() {
  let store = {}
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
  }
}

beforeEach(() => {
  const ls = makeLocalStorage()
  vi.stubGlobal('localStorage', ls)
  setActivePinia(createPinia())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test('round-trip penyimpanan RiskRecord ke localStorage', () => {
  fc.assert(
    fc.property(
      fc.record({
        timestamp: fc.integer({ min: new Date('2020-01-01').getTime(), max: new Date('2030-12-31').getTime() }).map(ms => new Date(ms).toISOString()),
        riskLevel: fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
        precipitation: fc.float({ min: 0, max: 200 }),
        temperature: fc.float({ min: -10, max: 50 }),
        humidity: fc.float({ min: 0, max: 100 }),
      }),
      (record) => {
        const ls = makeLocalStorage()
        vi.stubGlobal('localStorage', ls)
        setActivePinia(createPinia())

        const store = useRiskStore()
        store.saveRiskRecord(record)

        const loaded = store.loadRiskRecords().find(r => r.timestamp === record.timestamp)
        return JSON.stringify(loaded) === JSON.stringify(record)
      }
    ),
    { numRuns: 100 }
  )
})
