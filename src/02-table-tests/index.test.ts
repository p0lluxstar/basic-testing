// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 6, b: 7, action: Action.Subtract, expected: -1 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: -1, b: 5, action: Action.Multiply, expected: -5 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 5, b: '10', action: Action.Add, expected: null },
  { a: '3', b: '7', action: Action.Add, expected: null },
  { a: 2, b: 2, action: Action, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;
    test(`should ${expected}, action: ${a} ${action} ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
