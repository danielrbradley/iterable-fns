import * as Iterables from '../src/iterable-fns'

it('finds match', () => {
  expect(
    Iterables.get(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'bob'
    )
  ).toEqual({ name: 'bob', id: 2 })
})

it('throws when not found', () => {
  expect(() =>
    Iterables.get(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x) => x.name === 'cat'
    )
  ).toThrow('Element not found matching criteria')
})

it('finds by index', () => {
  expect(
    Iterables.get(
      (function* () {
        yield { name: 'amy', id: 1 }
        yield { name: 'bob', id: 2 }
      })(),
      (x, index) => index === 1
    )
  ).toEqual({ name: 'bob', id: 2 })
})
