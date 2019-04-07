import { mockRandom } from 'jest-mock-random';
import rollDiceCode from './index';

const testRolling = (code, expectedValue, expectedBreakdown) => test(
  code, () => expect(rollDiceCode(code)).toEqual(
    { result: expectedValue, breakdown: expectedBreakdown},
  )
)

describe('Integration test of everything tied together', () => {
  mockRandom([0.5]);
  
  testRolling('d6+d8-4', 5, [4, 5, -4])
  testRolling('1d6+2d4', 10, [4, 3, 3])
  testRolling('2d6+3d6', 20, [4, 4, 4, 4, 4])
  testRolling('10d6+4d10', 64, [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6])
  testRolling('11d20+1d100', 172, [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 51])
});
