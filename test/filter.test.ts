import * as Iterables from '../src/iterable-fns'

describe('filter', () => {
  it('can filter empty collection', () => {
    expect(Array.from(Iterables.filter(Iterables.init(0), (x) => true))).toEqual([])
  })
  it('can filter out everything', () => {
    expect(Array.from(Iterables.filter(Iterables.init(2), (x) => false))).toEqual([])
  })
  it('can filters based on criteria', () => {
    expect(
      Array.from(Iterables.filter(Iterables.init({ start: 1, count: 2 }), (x) => x % 2 === 0))
    ).toEqual([2])
  })
  it('can filters based on index', () => {
    function* source() {
      yield 1
      yield 2
      yield 15
      yield 7
    }
    expect(Array.from(Iterables.filter(source(), (x, index) => index % 2 === 0))).toEqual([1, 15])
  })
})
