const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const user = await User.findOneAndUpdate(
          {
            googleId: profile.id,
          },
          {
            $set: {
              googleId: profile.id,
              name: profile.displayName,
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

// store only the user id in the session
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

// get the full user from the id stored in the session
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});
