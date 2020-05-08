import * as Iterables from '../src/iterable-fns'

it('matches non-existance', () => {
  expect(
    Iterables.exists(
      (function* (): Generator<number> {
        yield 1
        yield 2
      })(),
      (x) => x === 3
    )
  ).toEqual(false)
})

it('matches existance', () => {
  expect(
    Iterables.exists(
      (function* () {
        yield 1
        yield 2
      })(),
      (x) => x === 1
    )
  ).toEqual(true)
})

it('passes index', () => {
  expect(
    Iterables.exists(
      (function* () {
        yield 1
        yield 2
      })(),
      (x, index) => x === 2 && index === 1
    )
  ).toEqual(true)
})
