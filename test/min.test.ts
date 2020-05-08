import { min } from '../src/iterable-fns'

test('finds min', () => {
  expect(
    min(
      (function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual(2)
})

test('fails on empty collection', () => {
  expect(() => min([])).toThrow(`Can't find min of an empty collection`)
})
