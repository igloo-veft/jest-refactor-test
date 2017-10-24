import express from 'express';
import mongoose, {Schema} from 'mongoose';
import { add } from './add';

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
/* DO NOT REFACTOR THIS CODE */

/* SERVER CODE TO REFACTOR */

// TODO make an app.js and a new index.js
// TODO fix mongodb connection string
mongoose.Promise = global.Promise;
export const employeeSchema = Schema({
  name: String,
  jobTitles: {type: [String]},
});

mongoose
  .connect('mongodb://<yourDatabaseUrlHere>/veft-testing', {
    useMongoClient: true,
  })
  .then(db => {
    const Employee = db.model('Employee', employeeSchema);
    const app = express();
    app.get('/', (req, res) => {
      Employee.find({}).exec((err, data) => res.json({data}));
    });
    app.listen(3000, () => console.log('Server running on port 3000'));
  });
/* SERVER CODE TO REFACTOR */
