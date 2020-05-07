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

describe('init', () => {
  test('empty', () => {
    expect(Array.from(Iterables.init(0))).toEqual([])
  })
  test('just count', () => {
    expect(Array.from(Iterables.init(5))).toEqual([0, 1, 2, 3, 4])
  })
  test('from-to', () => {
    expect(Array.from(Iterables.init({ from: 1, to: 3 }))).toEqual([1, 2, 3])
  })
  test('from-to-same', () => {
    expect(Array.from(Iterables.init({ from: 1, to: 1 }))).toEqual([1])
  })
  test('from-to fractional-increment', () => {
    expect(Array.from(Iterables.init({ from: 1, to: 2, increment: 0.5 }))).toEqual([1, 1.5, 2])
  })
  test('from-to overshooting-increment', () => {
    expect(Array.from(Iterables.init({ from: 1, to: 2, increment: 5 }))).toEqual([1])
  })
  test('from positive to negative', () => {
    expect(Array.from(Iterables.init({ from: 1, to: -1 }))).toEqual([1, 0, -1])
  })
  test('from negative to positive', () => {
    expect(Array.from(Iterables.init({ from: -1, to: 1 }))).toEqual([-1, 0, 1])
  })
  test('from positive to negative with fractional increment', () => {
    expect(Array.from(Iterables.init({ from: 1, to: -1, increment: -0.5 }))).toEqual([
      1,
      0.5,
      0,
      -0.5,
      -1,
    ])
  })
  test('from-to zero increment fails', () => {
    expect(() => Array.from(Iterables.init({ from: 1, to: 2, increment: 0 }))).toThrow(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  })
  test('from-to negative fails', () => {
    expect(() => Array.from(Iterables.init({ from: 1, to: 2, increment: -0.1 }))).toThrow(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  })
  test('from-to negative crossing zero fails', () => {
    expect(() => Array.from(Iterables.init({ from: -1, to: 1, increment: -1 }))).toThrow(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  })
  test('from-to reversed fails', () => {
    expect(() => Array.from(Iterables.init({ from: 2, to: 1, increment: 1 }))).toThrow(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  })
  test('from-to reversed crossing zero fails', () => {
    expect(() => Array.from(Iterables.init({ from: 1, to: -1, increment: 0.1 }))).toThrow(
      'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
    )
  })
  test('count prop', () => {
    expect(Array.from(Iterables.init({ count: 5 }))).toEqual([0, 1, 2, 3, 4])
  })
  test('start-count', () => {
    expect(Array.from(Iterables.init({ start: 3, count: 5 }))).toEqual([3, 4, 5, 6, 7])
  })
  test('count-increment', () => {
    expect(Array.from(Iterables.init({ count: 5, increment: 3 }))).toEqual([0, 3, 6, 9, 12])
  })
})

describe('initInfinite', () => {
  test('defaults', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite(), 5))).toEqual([0, 1, 2, 3, 4])
  })
  test('no properties', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite({}), 5))).toEqual([0, 1, 2, 3, 4])
  })
  test('just start', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite({ start: 5 }), 5))).toEqual([
      5,
      6,
      7,
      8,
      9,
    ])
  })
  test('just increment', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite({ increment: 5 }), 5))).toEqual([
      0,
      5,
      10,
      15,
      20,
    ])
  })
  test('fractional increment', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite({ increment: 0.5 }), 5))).toEqual([
      0,
      0.5,
      1,
      1.5,
      2,
    ])
  })
  test('custom range', () => {
    expect(
      Array.from(Iterables.take(Iterables.initInfinite({ start: 5, increment: 0.5 }), 5))
    ).toEqual([5, 5.5, 6, 6.5, 7])
  })
})

describe('map', () => {
  it('maps empty collection', () => {
    expect(Array.from(Iterables.map(Iterables.init(0), (x) => x))).toEqual([])
  })
  it('maps items without partial application', () => {
    expect(
      Array.from(Iterables.map(Iterables.init({ start: 1, count: 2 }), (x) => x * 2))
    ).toEqual([2, 4])
  })
  it('can map with index', () => {
    expect(
      Array.from(Iterables.map(Iterables.init({ start: 1, count: 2 }), (x, index) => index))
    ).toEqual([0, 1])
  })
})

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

describe('choose', () => {
  it('chooses defined values', () => {
    expect(
      Array.from(Iterables.choose([1, 2, 3], (x) => (x % 2 === 1 ? x * 2 : undefined)))
    ).toEqual([2, 6])
  })
  it('chooses with index', () => {
    expect(
      Array.from(Iterables.choose([1, 2, 3], (x, index) => (index % 2 === 0 ? x * 2 : x)))
    ).toEqual([2, 2, 6])
  })
})

describe('collect', () => {
  it('can collect iterables', () => {
    expect(
      Array.from(
        Iterables.collect([1, 2], function* (x) {
          yield x
          yield x
        })
      )
    ).toEqual([1, 1, 2, 2])
  })
  it('can collect with index', () => {
    expect(
      Array.from(
        Iterables.collect([1, 2], function* (x, index) {
          yield x
          yield x + index
        })
      )
    ).toEqual([1, 1, 2, 3])
  })
})

describe('append', () => {
  it('appends two iterators', () => {
    expect(
      Array.from(
        Iterables.append(
          (function* () {
            yield 1
          })(),
          (function* () {
            yield 2
          })()
        )
      )
    ).toEqual([1, 2])
  })
})

describe('concat', () => {
  it('appends nested iterators', () => {
    expect(
      Array.from(
        Iterables.concat(
          (function* () {
            yield (function* () {
              yield 1
              yield 2
            })()
            yield (function* () {
              yield 3
              yield 4
            })()
            yield [5]
          })()
        )
      )
    ).toEqual([1, 2, 3, 4, 5])
  })
})

describe('distinct', () => {
  it('ignores duplicates', () => {
    expect(
      Array.from(
        Iterables.distinct(
          (function* () {
            yield 'bob'
            yield 'cat'
            yield 'bob'
            yield 'amy'
          })()
        )
      )
    ).toEqual(['bob', 'cat', 'amy'])
  })
})

describe('distinctBy', () => {
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
})

describe('exists', () => {
  it('matches non-existance', () => {
    expect(
      Iterables.exists(
        (function* (): Generator<number> {
          yield 1
          yield 2
        })(),
        (x) => x === 3
      )
    ).toEqual(false)
  })
  it('matches existance', () => {
    expect(
      Iterables.exists(
        (function* () {
          yield 1
          yield 2
        })(),
        (x) => x === 1
      )
    ).toEqual(true)
  })
  it('passes index', () => {
    expect(
      Iterables.exists(
        (function* () {
          yield 1
          yield 2
        })(),
        (x, index) => x === 2 && index === 1
      )
    ).toEqual(true)
  })
})

describe('every', () => {
  it('matches existance', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 2
          yield 4
        })(),
        (x) => x % 2 === 0
      )
    ).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 1
          yield 2
        })(),
        (x) => x === 2
      )
    ).toEqual(false)
  })
  it('passes index', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 1
          yield 2
        })(),
        (x, index) => index < 2
      )
    ).toEqual(true)
  })
})

describe('get', () => {
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
})

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

describe('groupBy', () => {
  it('groups by key', () => {
    expect(
      Array.from(
        Iterables.groupBy(
          (function* () {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  })
  it('groups by index', () => {
    expect(
      Array.from(
        Iterables.groupBy(
          (function* () {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          (x, index) => index % 2
        )
      )
    ).toEqual([
      [
        0,
        [
          { name: 'amy', age: 1 },
          { name: 'cat', age: 2 },
        ],
      ],
      [1, [{ name: 'bob', age: 2 }]],
    ])
  })
})

describe('skip', () => {
  test('skipping none', () => {
    expect(
      Array.from(
        Iterables.skip(
          (function* () {
            yield 1
            yield 2
            yield 3
            yield 4
          })(),
          0
        )
      )
    ).toEqual([1, 2, 3, 4])
  })
  test('skipping some', () => {
    expect(
      Array.from(
        Iterables.skip(
          (function* () {
            yield 1
            yield 2
            yield 3
            yield 4
          })(),
          2
        )
      )
    ).toEqual([3, 4])
  })
  test('skipping all', () => {
    expect(
      Array.from(
        Iterables.skip(
          (function* () {
            yield 1
            yield 2
            yield 3
            yield 4
          })(),
          4
        )
      )
    ).toEqual([])
  })
  test('skipping more than count', () => {
    expect(
      Array.from(
        Iterables.skip(
          (function* () {
            yield 1
            yield 2
            yield 3
            yield 4
          })(),
          8
        )
      )
    ).toEqual([])
  })
})

describe('take', () => {
  test('taking some', () => {
    expect(Array.from(Iterables.take(Iterables.initInfinite(), 3))).toEqual([0, 1, 2])
  })
})

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

describe('sort', () => {
  test('numbers', () => {
    expect(Array.from(Iterables.sort([21, 2, 18]))).toEqual([2, 18, 21])
  })
  test('strings', () => {
    expect(
      Array.from(
        Iterables.sort(
          (function* () {
            yield 'cat'
            yield 'amy'
            yield 'bob'
          })()
        )
      )
    ).toEqual(['amy', 'bob', 'cat'])
  })
  test('with key selector', () => {
    expect(
      Array.from(
        Iterables.sort(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
})

describe('sortDescending', () => {
  test('numbers', () => {
    expect(
      Array.from(
        Iterables.sortDescending(
          (function* () {
            yield 21
            yield 2
            yield 18
          })()
        )
      )
    ).toEqual([21, 18, 2])
  })
  test('strings', () => {
    expect(
      Array.from(
        Iterables.sortDescending(
          (function* () {
            yield 'cat'
            yield 'amy'
            yield 'bob'
          })()
        )
      )
    ).toEqual(['cat', 'bob', 'amy'])
  })
  test('with key selector', () => {
    expect(
      Array.from(
        Iterables.sortDescending(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
})

describe('sortBy', () => {
  it('sorts by selected key', () => {
    expect(
      Array.from(
        Iterables.sortBy(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
})

describe('sortByDescending', () => {
  test('by selected key', () => {
    expect(
      Array.from(
        Iterables.sortByDescending(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
})

describe('reverse', () => {
  test('empty iterable', () => {
    expect(Array.from(Iterables.reverse(Iterables.init(0)))).toEqual([])
  })
  test('reversal', () => {
    expect(Array.from(Iterables.reverse([8, 3, 5]))).toEqual([5, 3, 8])
  })
})

describe('sum', () => {
  test('numbers', () => {
    expect(
      Iterables.sum(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    ).toEqual(41)
  })
})

describe('sumBy', () => {
  test('with value selector', () => {
    expect(
      Iterables.sumBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(41)
  })
})

describe('max', () => {
  it('finds max', () => {
    expect(
      Iterables.max(
        (function* () {
          yield 2
          yield 21
          yield 18
        })()
      )
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.max([])).toThrow(`Can't find max of an empty collection`)
  })
})

describe('maxBy', () => {
  it('finds max age', () => {
    expect(
      Iterables.maxBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.maxBy([], (x) => x)).toThrow(`Can't find max of an empty collection`)
  })
})

describe('min', () => {
  it('finds min', () => {
    expect(
      Iterables.min(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.min([])).toThrow(`Can't find min of an empty collection`)
  })
})

describe('minBy', () => {
  it('finds min age', () => {
    expect(
      Iterables.minBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.minBy([], (x) => x)).toThrow(`Can't find min of an empty collection`)
  })
})

describe('mean', () => {
  it('finds mean', () => {
    expect(
      Iterables.mean(
        (function* () {
          yield 21
          yield 2
          yield 18
          yield 39
        })()
      )
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.mean([])).toThrow(`Can't find mean of an empty collection`)
  })
})

describe('meanBy', () => {
  it('finds mean age', () => {
    expect(
      Iterables.meanBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
          yield { name: 'dot', age: 39 }
        })(),
        (x) => x.age
      )
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.meanBy([], (x) => x)).toThrow(`Can't find mean of an empty collection`)
  })
})
