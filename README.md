# Iterable Functions

[![npm version](https://badge.fury.io/js/iterable-fns.svg)](https://badge.fury.io/js/iterable-fns)
[![GitHub issues](https://img.shields.io/github/issues/danielrbradley/iterable-fns.svg)](https://github.com/danielrbradley/iterable-fns/issues)
[![TypeDoc docs](https://img.shields.io/badge/TypeDoc-docs-lightgrey.svg)](https://www.danielbradley.net/iterable-fns/)
[![Travis](https://img.shields.io/travis/danielrbradley/iterable-fns.svg)](https://travis-ci.org/danielrbradley/iterable-fns)
[![Coveralls](https://img.shields.io/coveralls/danielrbradley/iterable-fns.svg)](https://coveralls.io/github/danielrbradley/iterable-fns)
[![Dev Dependencies](https://david-dm.org/danielrbradley/iterable-fns/dev-status.svg)](https://david-dm.org/danielrbradley/iterable-fns?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/danielrbradley/iterable-fns.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Really simple functions for working with iterable types, inspired by F#'s seq module design.

## Features

- Full type-safety with TypeScript
- Zero dependency
- Pure functions

## Installation

Add package using NPM or yarn

```bash
npm i --save iterable-fns
```

```bash
yarn add iterable-fns
```

You can import the top level modules directly:

```javascript
import { groupBy } from 'iterable-fns'
```

## Examples

Calculating primes lazily with iterators:

```javascript
import { init, map, filter, count } from 'iterable-fns'

const range = init({ from: 1, to: 100 })
const mapped = map(range, (x) => ({
  x,
  factors: pipe(
    init({ from: 1, to: x }),
    filter((y) => x % y === 0)
  ),
}))
const filtered = filter(mapped, (num) => count(num.factors) === 2)
const primes = map(filtered, (num) => num.x)

for (const prime of primes) {
  console.log(prime)
}
```

Grouping numbers into odd and even buckets

```javascript
import { pipe, Maps } from 'iterable-fns'
import { init, groupBy } from 'iterable-fns'

const source = init({ from: 1, to: 25 })
const oddAndEven = groupBy(source, (i) => (i % 2 === 0 ? 'even' : 'odd'))
```

## NPM scripts

- `yarn test`: Run test suite
- `yarn start`: Run `yarn build` in watch mode
- `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `yarn test:prod`: Run linting and generate coverage
- `yarn build`: Generate bundles and typings, create docs
- `yarn lint`: Lints code
- `yarn commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
