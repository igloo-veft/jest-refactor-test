import { add, throws } from "./index";

describe('Testing the add() function', () => {
  test('Adding 1 and 1, add(1, 1)', () => {
    expect(add(1,1)).toBe(2);
  });

  test('Adding null and 1, add(null, 1)', () => {
    expect(add(null,1)).toBe(1);
  });

  test('Empty call to function, add()', () => {
    expect(add()).toBeNaN();
  });

  test('Adding a positive number and a negative number, add(1, -1)', () => {
    expect(add(1,-1)).toBe(0);
  });
});

describe('Testing that the throws function', () => {
  test('throws an error', () => {
    expect(throws).toThrowError();
  });
});