import * as Iterables from '../src/iterable-fns'

it('finds max', () => {
  expect(
    Iterables.max(
      (function* () {
        yield 2
        yield 21
        yield 18
      })()
    )
  ).toEqual(21)
})

it('fails on empty collection', () => {
  expect(() => Iterables.max([])).toThrow(`Can't find max of an empty collection`)
})
