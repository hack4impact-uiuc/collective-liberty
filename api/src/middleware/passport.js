const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => {
    if (err) {
      done(err);
    }

    done(null, user);
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ userId: profile.id }, async (err, user) => {
        if (err) {
          done(err);
        }

        if (user) {
          done(null, user);
        } else {
          const newUser = await new User({
            email: profile.emails[0].value,
            userId: profile.id,
          }).save();

          done(null, newUser);
        }
      });
    }
  )
);
