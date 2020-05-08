import { count, init, length } from '../src/iterable-fns'

test('zero length', () => {
  expect(count(init({ count: 0 }))).toEqual(0)
})

test('non-zero length', () => {
  expect(count(init({ count: 5 }))).toEqual(5)
})

describe('length alias', () => {
  test('zero length', () => {
    expect(length(init({ count: 0 }))).toEqual(0)
  })

  test('non-zero length', () => {
    expect(length(init({ count: 5 }))).toEqual(5)
  })
})
