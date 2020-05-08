import * as Iterables from '../src/iterable-fns'

describe('length', () => {
  it('can return zero length', () => {
    expect(Iterables.length(Iterables.init({ count: 0 }))).toEqual(0)
  })
  it('can return non-zero length', () => {
    expect(Iterables.length(Iterables.init({ count: 5 }))).toEqual(5)
  })
})

describe('count', () => {
  test('zero length', () => {
    expect(Iterables.count(Iterables.init({ count: 0 }))).toEqual(0)
  })
  test('non-zero length', () => {
    expect(Iterables.count(Iterables.init({ count: 5 }))).toEqual(5)
  })
})
