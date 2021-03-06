import { sortDescending, chain } from '../src/iterable-fns'

test('numbers', () => {
  expect(
    Array.from(
      sortDescending(
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
      sortDescending(
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
      sortDescending(
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

test('chaining', () => {
  expect(
    chain(
      (function* () {
        yield 'cat'
        yield 'amy'
        yield 'bob'
      })()
    )
      .sortDescending()
      .toArray()
  ).toEqual(['cat', 'bob', 'amy'])
})
