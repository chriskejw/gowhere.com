var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Act = require('../models/act');

// create a new user, hash password with bcrypt
router.post('/', function (req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (user) {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'Email has been taken.' }
            });
        }
        if (req.body.usertype === 'participant' || req.body.usertype === 'host') {
            if (req.body.usertype === 'host' && req.body.hostcode !== 'chriske') {
                return res.status(500).json({
                        title: 'An error occurred',
                        error: { message: 'Invalid host code. Please email us for a host code.' }
                });
            }
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
                        error: { message: 'Unable to create new user.' }
                    });
                }

                 // if success, respond with token, and user id
                 /**
                 * generates and signs a new token
                 * format of sign, .sign(payload, secret, {expiry: inseconds})
                 * @param  payload is a javascript object where we can store any value
                 * @param  secret accepts a string, anything you want
                 * @param  7200 seconds, 2 hours!
                 */
                var token = jwt.sign({user: result}, 'secret', {expiresIn: 7200});

                // if success, respond with token, and user id
                res.status(201).json({
                    message: 'User created',
                    obj: result,
                    token: token,
                    userId: user.username,
                    userType: user.usertype
                });
            });
        } else {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'Invalid usertype entered.' }
            });
        }
        
    });
});

// when trying to signin from ng2, find if email exists, check if password similar
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'Email not found.' }
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials.'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid email or password entered.'}
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

        // if success, respond with token, and user id
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user.username,
            userType: user.usertype
        });
    });
});

// return error if user not logged in
router.use('/', function (req, res, next) {

    /**
     * validate incoming token, if valid, continue operations with next()
     * @param  token of type string
     * @param  secret string, same as secret in user routes
     */
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Please login before continuing.' }
            });
        }
        next();
    })
});

router.get('/acts', function (req, res, next) {
    // decode the token to get current user id, find user using the id
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
    .populate('acts')
    .exec (function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'User not found.' }
            });
        }
        res.status(201).json({
            message: 'Found user',
            obj: user
        });
    });
});




module.exports = router;
