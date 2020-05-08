import * as Iterables from '../src/iterable-fns'

describe('sortBy', () => {
  it('sorts by selected key', () => {
    expect(
      Array.from(
        Iterables.sortBy(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
})
