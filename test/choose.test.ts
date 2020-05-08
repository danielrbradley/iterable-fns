import { choose } from '../src/iterable-fns'

test('choosing specific values', () => {
  expect(Array.from(choose([1, 2, 3], (x) => (x % 2 === 1 ? x * 2 : undefined)))).toEqual([2, 6])
})

test('using index', () => {
  expect(Array.from(choose([1, 2, 3], (x, index) => (index % 2 === 0 ? x * 2 : x)))).toEqual([
    2,
    2,
    6,
  ])
})
