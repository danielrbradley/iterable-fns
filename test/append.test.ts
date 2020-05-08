import * as Iterables from '../src/iterable-fns'

it('appends two iterators', () => {
  expect(
    Array.from(
      Iterables.append(
        (function* () {
          yield 1
        })(),
        (function* () {
          yield 2
        })()
      )
    )
  ).toEqual([1, 2])
})
