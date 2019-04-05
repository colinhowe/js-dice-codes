import { parseDiceCode } from './index';

const testParsing = (code, expected) => test(
  code, () => expect(parseDiceCode(code)).toEqual(expected)
)

describe('Simple die', () => {
  testParsing('d6', [{ die: 6, quantity: 1 }])
  testParsing('1d6', [{ die: 6, quantity: 1 }])
  testParsing('2d6', [{die: 6, quantity: 2 }])
  testParsing('10d6', [{die: 6, quantity: 10 }])
  testParsing('11d20', [{die: 20, quantity: 11 }])
})

describe('Die combos', () => {
  testParsing('d6+d8', [{ die: 6, quantity: 1 }, { die: 8, quantity: 1 }])
  testParsing('1d6+2d4', [{ die: 6, quantity: 1 }, { die: 4, quantity: 2 }])
  testParsing('2d6+3d6', [{die: 6, quantity: 2 }, { die: 6, quantity: 3 }])
  testParsing('10d6+4d10', [{die: 6, quantity: 10 }, { die: 10, quantity: 4 }])
  testParsing('11d20+1d100', [{die: 20, quantity: 11 }, { die: 100, quantity: 1 }])
})

describe('Adding a constant', () => {
  testParsing('5', [{ constant: 5 }])
  testParsing('1d6+5', [{ die: 6, quantity: 1 }, { constant: 5 }])
  testParsing('5+1d6', [{ constant: 5 }, { die: 6, quantity: 1 }])
})

describe('Subtracting a constant', () => {
  testParsing('-5', [{ constant: -5 }])
  testParsing('-1d6-5', [{ die: 6, quantity: -1 }, { constant:- 5 }])
  testParsing('-5-1d6', [{ constant: -5 }, { die: 6, quantity: -1 }])
})

describe('Error handling', () => {
  test('baz', () => {
    const badInput = () => parseDiceCode('baz')
    expect(badInput).toThrow('Invalid character b at position 0 in baz')
  })
  test('20b', () => {
    const badInput = () => parseDiceCode('20b')
    expect(badInput).toThrow('Invalid character b at position 2 in 20b')
  })
  test('1d6b1', () => {
    const badInput = () => parseDiceCode('1d6b1')
    expect(badInput).toThrow('Invalid character b at position 3 in 1d6b1')
  })
  test('d+5', () => {
    const badInput = () => parseDiceCode('d+5')
    expect(badInput).toThrow('Invalid character + at position 1 in d+5')
  })
  test('-', () => {
    const badInput = () => parseDiceCode('-')
    expect(badInput).toThrow('Unexpected end of input')
  })
  test('+', () => {
    const badInput = () => parseDiceCode('+')
    expect(badInput).toThrow(' Invalid character + at position 0 in +')
  })
})
