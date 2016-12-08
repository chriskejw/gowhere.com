var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    title: {type: String, required: true},
    details: {type: String, required: true},
    address: {type: String, required: true},
    thumbnail: {type: String, required: true},
    websiteurl: {type: String},
    starttime: {type: Date, required: true},
    endtime: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

/* after removing a act from act collection,
 find the user and remove from the acts array */
schema.post('remove', function (act) {
    User.findById(act.user, function (err, user) {
        user.acts.pull(act);
        user.save();
    });
});

module.exports = mongoose.model('Act', schema);