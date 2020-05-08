import * as Iterables from '../src/iterable-fns'

describe('minBy', () => {
  it('finds min age', () => {
    expect(
      Iterables.minBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.minBy([], (x) => x)).toThrow(`Can't find min of an empty collection`)
  })
})
