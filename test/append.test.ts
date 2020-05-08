import { append } from '../src/iterable-fns'

test('appends two iterators', () => {
  expect(
    Array.from(
      append(
        (function* () {
          yield 1
        })(),
        (function* () {
          yield 2
        })()
      )
    )
  ).toEqual([1, 2])
})
