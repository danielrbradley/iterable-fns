import * as Iterables from '../src/iterable-fns'

describe('every', () => {
  it('matches existance', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 2
          yield 4
        })(),
        (x) => x % 2 === 0
      )
    ).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 1
          yield 2
        })(),
        (x) => x === 2
      )
    ).toEqual(false)
  })
  it('passes index', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 1
          yield 2
        })(),
        (x, index) => index < 2
      )
    ).toEqual(true)
  })
})
