import * as Iterables from '../src/iterable-fns'

it('finds mean', () => {
  expect(
    Iterables.mean(
      (function* () {
        yield 21
        yield 2
        yield 18
        yield 39
      })()
    )
  ).toEqual(20)
})

it('fails on empty collection', () => {
  expect(() => Iterables.mean([])).toThrow(`Can't find mean of an empty collection`)
})
