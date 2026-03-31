import fc from 'fast-check'
import { describe, test, vi, beforeEach, afterEach, expect } from 'vitest'
import { useWeather } from '@/composables/useWeather'

describe('Property 4: Fetch Cuaca Dipanggil dengan Koordinat yang Benar', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('fetchWeather dipanggil dengan koordinat yang benar sebagai query params', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.float({ min: -90, max: 90, noNaN: true }),
        fc.float({ min: -180, max: 180, noNaN: true }),
        async (lat, lon) => {
          const mockResponse = {
            ok: true,
            json: async () => ({
              current: {
                temperature_2m: 25,
                relative_humidity_2m: 60,
                precipitation: 0,
                wind_speed_10m: 10,
                time: new Date().toISOString(),
              },
              daily: {
                time: ['2024-01-01'],
                temperature_2m_max: [30],
                temperature_2m_min: [20],
                precipitation_sum: [0],
                weather_code: [0],
              },
            }),
          }

          fetch.mockResolvedValueOnce(mockResponse)

          const { fetchWeather } = useWeather()
          await fetchWeather(lat, lon)

          expect(fetch).toHaveBeenCalledTimes(1)

          const calledUrl = new URL(fetch.mock.calls[0][0])
          expect(Number(calledUrl.searchParams.get('latitude'))).toBeCloseTo(lat, 5)
          expect(Number(calledUrl.searchParams.get('longitude'))).toBeCloseTo(lon, 5)

          fetch.mockReset()
        }
      ),
      { numRuns: 100 }
    )
  })
})
