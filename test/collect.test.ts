import * as Iterables from '../src/iterable-fns'

it('can collect iterables', () => {
  expect(
    Array.from(
      Iterables.collect([1, 2], function* (x) {
        yield x
        yield x
      })
    )
  ).toEqual([1, 1, 2, 2])
})

it('can collect with index', () => {
  expect(
    Array.from(
      Iterables.collect([1, 2], function* (x, index) {
        yield x
        yield x + index
      })
    )
  ).toEqual([1, 1, 2, 3])
})
