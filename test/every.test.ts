import { every } from '../src/iterable-fns'

test('matches existance', () => {
  expect(
    every(
      (function* () {
        yield 2
        yield 4
      })(),
      (x) => x % 2 === 0
    )
  ).toEqual(true)
})

test('matches non-existance', () => {
  expect(
    every(
      (function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 2
    )
  ).toEqual(false)
})

test('passes index', () => {
  expect(
    every(
      (function* () {
        yield 1
        yield 2
      })(),
      (x, index) => index < 2
    )
  ).toEqual(true)
})
