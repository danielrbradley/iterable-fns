import * as Iterables from '../src/iterable-fns'

it('ignores duplicates', () => {
  expect(
    Array.from(
      Iterables.distinct(
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
