import * as Iterables from '../src/iterable-fns'

describe('find', () => {
  it('finds match', () => {
    expect(
      Iterables.find(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        (x) => x.name === 'bob'
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('returns undefined when not found', () => {
    expect(
      Iterables.find(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        (x) => x.name === 'cat'
      )
    ).toBeUndefined()
  })
  it('finds by index', () => {
    expect(
      Iterables.find(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        (x, index) => index === 1
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
})
