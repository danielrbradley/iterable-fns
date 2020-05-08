import * as Iterables from '../src/iterable-fns'

describe('min', () => {
  it('finds min', () => {
    expect(
      Iterables.min(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.min([])).toThrow(`Can't find min of an empty collection`)
  })
})
