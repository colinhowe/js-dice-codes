# js-dice-codes [![CircleCI](https://circleci.com/gh/colinhowe/js-dice-codes.svg?style=svg)](https://circleci.com/gh/colinhowe/js-dice-codes) [![codecov](https://codecov.io/gh/colinhowe/js-dice-codes/branch/master/graph/badge.svg)](https://codecov.io/gh/colinhowe/js-dice-codes)

# Overview

A dice code parser and roller. Takes dice codes of the form `1d6 + 1d8 + 4` and
outputs the result as well as the roll of each dice.

# Usage

```
> npm i --save js-dice-codes
> import roll from 'js-dice-codes';
> roll('10d6')
{ result: 33, breakdown: [ 3, 4, 6, 1, 2, 4, 5, 4, 1, 3 ] }
```
