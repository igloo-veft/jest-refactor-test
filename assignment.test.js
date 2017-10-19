import { add, throws } from "./index";

describe('Testing that with the add() function', () => {
  test('1+1=2', () => {
    expect(add(1,1)).toBe(2);
  });

  test('null+1=1', () => {
    expect(add(null,1)).toBe(1);
  });

  test('an empty call equals NaN', () => {
    expect(add()).toBeNaN();
  });

  test('1+(-1)=0', () => {
    expect(add(1,-1)).toBe(0);
  });
});

describe('Testing that the throws function', () => {
  test('throws an error', () => {
    expect(throws).toThrowError();
  });
  test('gives a specific message when throwing error', () => {
    expect(throws).toThrowError('You need to mock me');
  });

  test('does not throw any more with mock', () => {
    expect(throws).not.toThrowError();
  });
});