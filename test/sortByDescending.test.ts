import { sortByDescending } from '../src/iterable-fns'

test('by selected key', () => {
  expect(
    Array.from(
      sortByDescending(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    )
  ).toEqual([
    { name: 'amy', age: 21 },
    { name: 'cat', age: 18 },
    { name: 'bob', age: 2 },
  ])
})
