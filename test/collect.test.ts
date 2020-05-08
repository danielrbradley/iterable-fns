import { collect } from '../src/iterable-fns'

test('collect iterables', () => {
  expect(
    Array.from(
      collect([1, 2], function* (x) {
        yield x
        yield x
      })
    )
  ).toEqual([1, 1, 2, 2])
})

test('with index', () => {
  expect(
    Array.from(
      collect([1, 2], function* (x, index) {
        yield x
        yield x + index
      })
    )
  ).toEqual([1, 1, 2, 3])
})
