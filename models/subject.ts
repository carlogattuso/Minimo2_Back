let mongoose = require('mongoose');

import {Schema,model} from 'mongoose';

/**
 * Definition of subject schema
 */
const SubjectSchema: Schema = new Schema({
    name: {type: String, required: true},
    students: [{type: mongoose.Types.ObjectId, ref: 'Student'}]
});

/**
 * Export the subject schema
 * @type {Model}
 */
export default model('Subject', SubjectSchema);
