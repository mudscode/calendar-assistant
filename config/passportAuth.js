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
      // console.log("Google Strategy callback invoked");
      // console.log(`Hello ${profile.displayName}`);
      // console.log(accessToken);
      // console.log(refreshToken);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = {
    id: id,
  };

  done(null, user);
});


module.exports = passport;
