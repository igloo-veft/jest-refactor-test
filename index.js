import express from 'express';
import mongoose, {Schema} from 'mongoose';
import { add } from './add';
import app from './app';

/* DO NOT REFACTOR THIS CODE */
//export const add = (a, b) => a + b;

export const throws = n => {
  throw new Error('You need to mock me');
  return n;
};

export const loop = n => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += add(n, n - 1);
  }
  return sum;
};


mongoose.Promise = global.Promise;
export const employeeSchema = Schema({
  name: String,
  jobTitles: {type: [String]},
});

mongoose
   .connect('mongodb://Makus:Makus@ds125914.mlab.com:25914/veft-test', {
    useMongoClient: true,
  })
  .then(db => {
	  const server = app(db);
	  server.listen(3000, () => console.log('Server running on port 3000'));
  });