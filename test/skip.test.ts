import * as Iterables from '../src/iterable-fns'

test('skipping none', () => {
  expect(
    Array.from(
      Iterables.skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        0
      )
    )
  ).toEqual([1, 2, 3, 4])
})

test('skipping some', () => {
  expect(
    Array.from(
      Iterables.skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        2
      )
    )
  ).toEqual([3, 4])
})

test('skipping all', () => {
  expect(
    Array.from(
      Iterables.skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        4
      )
    )
  ).toEqual([])
})

test('skipping more than count', () => {
  expect(
    Array.from(
      Iterables.skip(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        8
      )
    )
  ).toEqual([])
})
