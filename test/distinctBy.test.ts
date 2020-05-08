import * as Iterables from '../src/iterable-fns'

it('ignores duplicates without partial application', () => {
  expect(
    Array.from(
      Iterables.distinctBy(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })(),
        (x) => x.name
      )
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 2 },
    { name: 'cat', id: 3 },
  ])
})

it('passes index', () => {
  expect(
    Array.from(
      Iterables.distinctBy(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })(),
        (x, index) => Math.floor(index / 2)
      )
    )
  ).toEqual([
    { name: 'amy', id: 1 },
    { name: 'bob', id: 3 },
  ])
})
