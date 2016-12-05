var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Act = require('../models/act');

// find and return all the acts, including all user credentials based on 'user' field
router.get('/', function (req, res, next) {
    Act.find()
        .populate('user', 'username')
        .exec(function (err, acts) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: acts
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
                error: { message: 'Please login as a host to create an event.' }
            });
        }
        next();
    })
});

// create and save a new act
router.post('/', function (req, res, next) {
    // decode the token to get current user id, find user using the id
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'User not found.' }
            });
        }
        // create and save a new act with user credentials in 'user' field
        var act = new Act({
            title: req.body.title,
            category: req.body.category,
            details: req.body.details,
            address: req.body.address,
            capacity: req.body.capacity,
            picture: req.body.picture,
            thumbnail: req.body.thumbnail,
            websiteurl: req.body.websiteurl,
            starttime: req.body.starttime,
            endtime: req.body.endtime,
            user: user
        });
        act.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: { message: 'Unable to save act.' }
                });
            }
            // add the new act into the user.acts array
            // returns the new created act as a response to ng actService
            user.acts.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved act',
                obj: result
            });
        });
    });
});

// edit act details if act found, and current user is the 'owner' of the act
router.patch('/:id', function (req, res, next) {
    // decode the token to get current user id
    var decoded = jwt.decode(req.query.token);
    Act.findById(req.params.id, function (err, act) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!act) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Act not found'}
            });
        }
        if (act.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        act.title = req.body.title;
        act.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: { message: 'Unable to edit act.' }
                });
            }
            res.status(200).json({
                message: 'Updated act',
                obj: result
            });
        });
    });
});

// delete act if act found, and current user is the 'owner' of the act
router.delete('/:id', function (req, res, next) {
    // decode the token to get current user id
    var decoded = jwt.decode(req.query.token);
    Act.findById(req.params.id, function (err, act) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: { message: 'User not found.' }
            });
        }
        if (!act) {
            return res.status(500).json({
                title: 'An error occurred',
                error: {message: 'Act not found'}
            });
        }
        if (act.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        act.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: { message: 'Unable to delete act.' }
                });
            }
            res.status(200).json({
                message: 'Deleted act',
                obj: result
            });
        });
    });
});

module.exports = router;