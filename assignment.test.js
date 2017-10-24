import { throws, loop } from './index';
import { add } from './add';
import * as Module from './index';
import * as addModule from './add';
import mongoose from 'mongoose';
import request from 'supertest';
import mongo from 'mongodb-memory-server';
import app from './app';

//jest.mock('./index', () => ({
//  throws: jest.fn(),
//  add: jest.fn((a, b) => {
//    return a+b;
//  }),
//}));

mongoose.Promise = global.Promise;
let mongoServer;
let server;

beforeAll(() => {
  return new Promise((resolve, reject) => {
    mongoServer = new mongo();
    mongoServer.getConnectionString().then((mongoUri) => {
      mongoose
        .connect(mongoUri, {
          useMongoClient: true
        }).then(db => {
          server = app(db);
          resolve();
        });
    });
  });
});

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
    const spy = jest.spyOn(addModule, 'add');
    loop(1);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockReset();
  });

  test('add() gets called 3 times', () => {
    const spy = jest.spyOn(addModule, 'add');
    loop(3);
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockReset();
  });

  test('add() gets called 6 times', () => {
    const spy = jest.spyOn(addModule, 'add');
    loop(6);
    expect(spy).toHaveBeenCalledTimes(6);
    spy.mockReset();
  });
});

describe('Testing the web service', () => {
  //TODO does the webservice exists or responds
  test('Doest server respond', () => {
	  request(server)
	  .get('/')
      .expect(200)
      });
});

describe('Testing output from GET with snapshot', () => {
  test('test', done => {
    request(server)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({Employees:[]});
        done();
      });
  });

  const createEmployees = (n, cb) => {
    let promises = [];
    for(let i = 0; i<n; i++) {
      promises.push(new Promise((resolve, reject) => {
        request(server)
      })
    )}
	Promise.all(promises).then(cb);
  };
  

  test('should return 3 employees when 3 employess have been created', done => {
    createEmployees(3, () => {
    request(server)
      .get('/')
      .expect(200)
      .then(res => {
        const resultWithoutIds = res.body.Employees.map(({name, jobtitle}) => ({name, jobtitle}));
        expect(resultWithoutIds).toMatchSnapshot('should return 3 employees when 3 employess have been created');
        done();
      });
    });
  });
});