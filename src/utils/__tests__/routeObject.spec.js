import fc from 'fast-check'

/**
 * @param {{ distance: number, duration: number }} route
 * @returns {boolean}
 */
function isValidRoute(route) {
  return (
    route !== null &&
    typeof route.distance === 'number' &&
    typeof route.duration === 'number' &&
    route.distance > 0 &&
    route.duration > 0
  )
}

test('setiap rute yang valid memiliki distance (km) dan duration (menit) yang bernilai positif', () => {
  fc.assert(
    fc.property(
      fc.record({
        distance: fc.float({ min: Math.fround(0.001), max: Math.fround(10000), noNaN: true }),
        duration: fc.float({ min: Math.fround(0.001), max: Math.fround(10000), noNaN: true })
      }),
      (route) => {
        return isValidRoute(route)
      }
    ),
    { numRuns: 100 }
  )
})

test('rute dengan distance atau duration nol atau negatif dianggap tidak valid', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.record({
          distance: fc.float({ max: 0, noNaN: true }),
          duration: fc.float({ min: Math.fround(0.001), max: Math.fround(10000), noNaN: true })
        }),
        fc.record({
          distance: fc.float({ min: Math.fround(0.001), max: Math.fround(10000), noNaN: true }),
          duration: fc.float({ max: 0, noNaN: true })
        })
      ),
      (route) => {
        return !isValidRoute(route)
      }
    ),
    { numRuns: 100 }
  )
})
