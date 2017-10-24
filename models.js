import mongoose, {Schema} from 'mongoose';

export const Employee = mongoose.model(
	'employee',
	Schema({
		name: String,
		jobTitles: {type: [String]},
	})
)
;