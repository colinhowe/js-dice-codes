import { mockRandom, resetMockRandom } from 'jest-mock-random';
import roll from './roller';

describe('Test basic roll', () => {
  it('1d6', () => {
    mockRandom([0.4]);
    const result = roll([{ die: 6, quantity: 1 }]);
    expect(result).toEqual({ result: 3, breakdown: [3] });
  });

  it('2d10', () => {
    mockRandom([0, 0.999]);
    const result = roll([{ die: 10, quantity: 2 }]);
    expect(result).toEqual({ result: 11, breakdown: [1, 10] });
  });
});

describe('Test multi-shaped roll', () => {
  it('1d6+1d10', () => {
    mockRandom([0.999, 0]);
    const result = roll([{ die: 6, quantity: 1 }, { die: 10, quantity: 1 }]);
    expect(result).toEqual({ result: 7, breakdown: [6, 1] });
  });
});

describe('Test handles constants', () => {
  it('1d6+5', () => {
    mockRandom([0.999]);
    const result = roll([{ die: 6, quantity: 1 }, { constant: 5 }]);
    expect(result).toEqual({ result: 11, breakdown: [6, 5] });
  });
});

describe('Test distribution', () => {
  it('Has a sane distribution over lots of rolls', () => {
    // Use Pearson's chi squared test to check that the rolling as no 
    // readily detectable bias
    // https://en.wikipedia.org/wiki/Pearson's_chi-squared_test
    resetMockRandom();

    const sides = 6;
    const rolls = 100000;

    const buckets = {};
    for (let i = 1; i <= 6; i++) {
      buckets[i] = 0;
    }

    for (let i = 0; i < rolls; i++) {
      const result = roll([{ die: sides, quantity: 1 }]);
      buckets[result.breakdown[0]] += 1;
    }

    let chiSquared = 0;
    for (let i = 1; i <= sides; i++) {
       chiSquared += Math.pow(buckets[i] - (rolls / sides), 2) / buckets[i];
    }

    // This value below should mean we succeed in 999 out of 1,000 tests if the
    // die is not biased
    // Verified that this does fail if a slight bias of 0.01 is introduced to
    // Math.random (Math.random() - 0.01)
    expect(chiSquared).toBeLessThan(20.515);
  });
});
