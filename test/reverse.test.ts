import * as Iterables from '../src/iterable-fns'

describe('reverse', () => {
  test('empty iterable', () => {
    expect(Array.from(Iterables.reverse(Iterables.init(0)))).toEqual([])
  })
  test('reversal', () => {
    expect(Array.from(Iterables.reverse([8, 3, 5]))).toEqual([5, 3, 8])
  })
})
