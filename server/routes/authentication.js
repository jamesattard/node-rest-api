const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

// -----------
// AUTH ROUTES
// -----------

// Handle a protected route
router.get('/', requireAuth, function(req, res){
  res.send({hi: 'there'});
});

// Handle signin
router.post('/signin', requireSignin, function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  // Luckily passport's done callback gives us an instance
  // of the user model as req.user
  res.send({ token: tokenForUser(req.user) });
});

// Handle signup
router.post('/signup', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.'});
  }

  // See if a user with a given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    // save to database
    user.save(function(err){
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    }); 
  });
});

module.exports = router;