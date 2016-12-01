var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// create a new user, hash password with bcrypt
router.post('/', function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        usertype: req.body.usertype,
        username: req.body.username
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            act: 'User created',
            obj: result
        });
    });
});

// when trying to signin from ng2, find if email exists, check if password similar
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {act: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {act: 'Invalid login credentials'}
            });
        }

        /**
         * generates and signs a new token
         * format of sign, .sign(payload, secret, {expiry: inseconds})
         * @param  payload is a javascript object where we can store any value
         * @param  secret accepts a string, anything you want
         * @param  7200 seconds, 2 hours!
         */
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        // if success, respond with act, token, and user id
        res.status(200).json({
            act: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;
