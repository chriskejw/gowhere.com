var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    usertype: {type: String, required: true},
    username: {type: String, required: true},
    acts: [{type: Schema.Types.ObjectId, ref: 'Act'}]
});

// third party package to validate schema, fields with unique true
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);