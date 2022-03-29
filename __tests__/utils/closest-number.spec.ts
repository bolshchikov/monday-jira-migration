import { POSSIBLE_CE } from '../../src/jira/consts';
import { findClosest } from '../../src/utils/closest-number';

describe('Closest number', () => {
  it('should return 1 for 0.5', () => {
    expect(findClosest(POSSIBLE_CE, 0.5)).toBe(1);
  });
  it('should return 5 for 8', () => {
    expect(findClosest(POSSIBLE_CE, 8)).toBe(5);
  });
  it('should return 3 for 3', () => {
    expect(findClosest(POSSIBLE_CE, 3)).toBe(3);
  });
  it('should return 5 for 5', () => {
    expect(findClosest(POSSIBLE_CE, 5)).toBe(5);
  });
  it('should return 1 for -1', () => {
    expect(findClosest(POSSIBLE_CE, -1)).toBe(1);
  });
  it('should return 1 for 0', () => {
    expect(findClosest(POSSIBLE_CE, 0)).toBe(1);
  });
  it('should return 4 for 3.5', () => {
    expect(findClosest(POSSIBLE_CE, 3.5)).toBe(3);
  });
  it('should return 1 for 1.5', () => {
    expect(findClosest(POSSIBLE_CE, 1.5)).toBe(1);
  });
});