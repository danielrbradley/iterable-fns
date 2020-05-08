import * as Iterables from '../src/iterable-fns'

describe('sumBy', () => {
  test('with value selector', () => {
    expect(
      Iterables.sumBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(41)
  })
})
