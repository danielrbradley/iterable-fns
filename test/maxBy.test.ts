import * as Iterables from '../src/iterable-fns'

describe('maxBy', () => {
  it('finds max age', () => {
    expect(
      Iterables.maxBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.maxBy([], (x) => x)).toThrow(`Can't find max of an empty collection`)
  })
})
