import * as Iterables from '../src/iterable-fns'

test('numbers', () => {
  expect(
    Array.from(
      Iterables.sortDescending(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    )
  ).toEqual([21, 18, 2])
})

test('strings', () => {
  expect(
    Array.from(
      Iterables.sortDescending(
        (function* () {
          yield 'cat'
          yield 'amy'
          yield 'bob'
        })()
      )
    )
  ).toEqual(['cat', 'bob', 'amy'])
})

test('with key selector', () => {
  expect(
    Array.from(
      Iterables.sortDescending(
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
