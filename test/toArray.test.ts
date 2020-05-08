import { toArray } from '../src/iterable-fns'

test('constructs an array', () => {
  function* source() {
    yield 1
    yield 2
  }
  expect(toArray(source())).toEqual([1, 2])
})
