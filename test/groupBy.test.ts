import * as Iterables from '../src/iterable-fns'

describe('groupBy', () => {
  it('groups by key', () => {
    expect(
      Array.from(
        Iterables.groupBy(
          (function* () {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  })
  it('groups by index', () => {
    expect(
      Array.from(
        Iterables.groupBy(
          (function* () {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          (x, index) => index % 2
        )
      )
    ).toEqual([
      [
        0,
        [
          { name: 'amy', age: 1 },
          { name: 'cat', age: 2 },
        ],
      ],
      [1, [{ name: 'bob', age: 2 }]],
    ])
  })
})
