import { sumBy } from '../src/iterable-fns'

test('with value selector', () => {
  expect(
    sumBy(
      (function* () {
        yield { name: 'amy', age: 21 }
        yield { name: 'bob', age: 2 }
        yield { name: 'cat', age: 18 }
      })(),
      (x) => x.age
    )
  ).toEqual(41)
})
