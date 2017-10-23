import { add, throws, loop } from './index';
import * as Module from './index';
import mongoose from 'mongoose';

//jest.mock('./index', () => ({
//  throws: jest.fn(),
//  add: jest.fn((a, b) => {
//    return a+b;
//  }),
//}));

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

  test('does not throw any more when mocked', () => {
    Module.throws = jest.fn();
    expect(throws).not.toThrowError();
  });
});

describe('loop()', () => {
  test('loop works with 1, 2 and 3', () => {
    expect(loop(1)).toBe(1);
    expect(loop(2)).toBe(6);
    expect(loop(3)).toBe(15);
  });

  test('add() gets called 1 time', () => {
    const spy = jest.spyOn(Module, 'add');
    loop(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('add() gets called 3 times', () => {
    const spy = jest.spyOn(Module, 'add');
    loop(3);
    expect(spy).toHaveBeenCalledTimes(3);
  })
});

describe('Testing the web service', () => {

});

describe('Testing output from GET', () => {

});