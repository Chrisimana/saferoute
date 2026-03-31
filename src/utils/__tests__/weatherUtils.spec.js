import fc from 'fast-check'
import { describe, test } from 'vitest'
import { processForecast, getWeatherIcon } from '@/utils/weatherUtils'

const dateStringArb = fc
  .tuple(
    fc.integer({ min: 2024, max: 2030 }),
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 1, max: 28 })
  )
  .map(([y, m, d]) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`)

const validDailyArb = fc.record({
  time: fc.array(dateStringArb, { minLength: 7, maxLength: 7 }),
  temperature_2m_max: fc.array(fc.float({ min: -20, max: 50, noNaN: true }), { minLength: 7, maxLength: 7 }),
  temperature_2m_min: fc.array(fc.float({ min: -20, max: 50, noNaN: true }), { minLength: 7, maxLength: 7 }),
  precipitation_sum: fc.array(fc.float({ min: 0, max: 200, noNaN: true }), { minLength: 7, maxLength: 7 }),
  weather_code: fc.array(fc.integer({ min: 0, max: 99 }), { minLength: 7, maxLength: 7 }),
})

const validApiResponseArb = fc.record({
  daily: validDailyArb,
})

describe('Property 10: Prakiraan Mengandung Tepat 7 Hari', () => {
  test('processForecast selalu mengembalikan tepat 7 elemen ForecastDay untuk respons API yang valid', () => {
    fc.assert(
      fc.property(validApiResponseArb, (apiResponse) => {
        const result = processForecast(apiResponse)
        return result.length === 7
      }),
      { numRuns: 100 }
    )
  })
})

describe('Property 11: Setiap Hari Prakiraan Memiliki RiskLevel', () => {
  test('setiap ForecastDay memiliki riskLevel yang sesuai dengan precipitationSum-nya', () => {
    fc.assert(
      fc.property(validApiResponseArb, (apiResponse) => {
        const result = processForecast(apiResponse)
        return result.every((day, i) => {
          const precip = apiResponse.daily.precipitation_sum[i]
          if (precip < 10) return day.riskLevel === 'Rendah'
          if (precip <= 30) return day.riskLevel === 'Sedang'
          return day.riskLevel === 'Tinggi'
        })
      }),
      { numRuns: 100 }
    )
  })
})

const validWmoCodes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 77, 80, 81, 82, 95, 96, 99]
const validCategories = ['cerah', 'berawan', 'hujan', 'badai']

describe('Property 12: Mapping Weather Code ke Ikon', () => {
  test('getWeatherIcon mengembalikan identifier ikon tidak null dan sesuai kategori untuk setiap WMO code yang valid', () => {
    fc.assert(
      fc.property(fc.constantFrom(...validWmoCodes), (weatherCode) => {
        const result = getWeatherIcon(weatherCode)
        return result !== null && result !== undefined && validCategories.includes(result)
      }),
      { numRuns: 100 }
    )
  })
})
