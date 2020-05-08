import { take, initInfinite } from '../src/iterable-fns'

test('defaults', () => {
  expect(Array.from(take(initInfinite(), 5))).toEqual([0, 1, 2, 3, 4])
})

test('no properties', () => {
  expect(Array.from(take(initInfinite({}), 5))).toEqual([0, 1, 2, 3, 4])
})

test('just start', () => {
  expect(Array.from(take(initInfinite({ start: 5 }), 5))).toEqual([5, 6, 7, 8, 9])
})

test('just increment', () => {
  expect(Array.from(take(initInfinite({ increment: 5 }), 5))).toEqual([0, 5, 10, 15, 20])
})

test('fractional increment', () => {
  expect(Array.from(take(initInfinite({ increment: 0.5 }), 5))).toEqual([0, 0.5, 1, 1.5, 2])
})

test('custom range', () => {
  expect(Array.from(take(initInfinite({ start: 5, increment: 0.5 }), 5))).toEqual([
    5,
    5.5,
    6,
    6.5,
    7,
  ])
})
