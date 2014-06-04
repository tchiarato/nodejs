var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('../models/user');

passport.use(new BasicStrategy(
    function(username, password, callback) {
        User.findOne({ username: username }, function(err, user) {
            if (err) return callback(err);

            // No user found with the username
            if (!user) return callback(null, false);

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) return callback(err);

                // Password did not match
                if(!isMatch) return callback(null, false);

                // Success
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
