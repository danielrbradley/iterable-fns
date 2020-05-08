import { distinct } from '../src/iterable-fns'

test('duplicates', () => {
  expect(
    Array.from(
      distinct(
        (function* () {
          yield 'bob'
          yield 'cat'
          yield 'bob'
          yield 'amy'
        })()
      )
    )
  ).toEqual(['bob', 'cat', 'amy'])
})
