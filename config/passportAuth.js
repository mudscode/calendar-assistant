// passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {

      const user = {
        id: profile.id,
        accessToken: accessToken,
        profile: profile,
      }
      // console.log("Google Strategy callback invoked");
      // console.log(`Hello ${profile.displayName}`);
      // console.log(accessToken);
      // console.log(refreshToken);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


module.exports = passport;
