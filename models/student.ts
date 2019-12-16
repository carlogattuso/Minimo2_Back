let mongoose = require('mongoose');

import {Schema,model} from 'mongoose';

/**
 * Definition of student schema
 */
const StudentSchema: Schema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phones: [{
        key: String,
        value: String
    }],
    studies: [
        {
            name: String
        }
    ]
});

/**
 * Export the student schema
 * @type {Model}
 */
export default model('Student', StudentSchema);
