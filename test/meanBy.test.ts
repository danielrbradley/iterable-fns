import * as Iterables from '../src/iterable-fns'

it('finds mean age', () => {
  expect(
    Iterables.meanBy(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
        yield { name: 'dot', age: 39 }
      })(),
      (x) => x.age
    )
  ).toEqual(20)
})

it('fails on empty collection', () => {
  expect(() => Iterables.meanBy([], (x) => x)).toThrow(`Can't find mean of an empty collection`)
})
