import * as Iterables from '../src/iterable-fns'

describe('toArray', () => {
  it('constructs an array', () => {
    function* source() {
      yield 1
      yield 2
    }
    expect(Iterables.toArray(source())).toEqual([1, 2])
  })
})
