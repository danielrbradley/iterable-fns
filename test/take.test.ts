import { take, initInfinite } from '../src/iterable-fns'

test('taking some', () => {
  expect(Array.from(take(initInfinite(), 3))).toEqual([0, 1, 2])
})
