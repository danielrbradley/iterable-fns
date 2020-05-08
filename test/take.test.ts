import * as Iterables from '../src/iterable-fns'

describe('take', () => {
  test('taking some', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite(), 3))).toEqual([0, 1, 2])
  })
})
