import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {Schema} from 'mongoose';
import { Employee } from './models';

export const employeeSchema = Schema({
	  name: String,
	  jobTitles: {type: [String]},
	});

export default db => {
	
	const app = express();
	app.use(bodyParser.json());

	//const Employee = db.model('Employee', employeeSchema);
	
	app.get('/employee', (req, res) => {
		Employee.find({}).exec((err, data) => res.json({data}));
	});


	return app;
};