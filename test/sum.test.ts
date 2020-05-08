import * as Iterables from '../src/iterable-fns'

test('numbers', () => {
  expect(
    Iterables.sum(
      (function* () {
        yield 21
        yield 2
        yield 18
      })()
    )
  ).toEqual(41)
})
