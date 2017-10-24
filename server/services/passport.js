const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Setup options of local strategy
const localOptions = {
  usernameField: 'email'
}

// Create local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password
  // Call done with the user if correct email:password
  // Otherwise call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false); }
    // If it does, call 'done' with that user
    if (user) {
      done(null, user);
    } else {
      // otherwise, call 'done' without a user object
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);