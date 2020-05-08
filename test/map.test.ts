import * as Iterables from '../src/iterable-fns'

it('maps empty collection', () => {
  expect(Array.from(Iterables.map(Iterables.init(0), (x) => x))).toEqual([])
})

it('maps items without partial application', () => {
  expect(Array.from(Iterables.map(Iterables.init({ start: 1, count: 2 }), (x) => x * 2))).toEqual([
    2,
    4,
  ])
})

it('can map with index', () => {
  expect(
    Array.from(Iterables.map(Iterables.init({ start: 1, count: 2 }), (x, index) => index))
  ).toEqual([0, 1])
})
