const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/User');

function setupGoogle({ ROOT_URL, server }) {
  // 1. define `verify` method: get profile and googleToken from Google
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.emails[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }

    try {
      // 2. call and wait for static method `User.signInOrSignUp` to return created or existing user
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err);
    }
  };
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verify,
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 3. serialize user AND deserialize user;
  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields())
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });

  // 4. initialize passport AND passport's session
  server.use(passport.initialize());
  server.use(passport.session());

  // 5. Define Express routes (/auth/google, /oauth2callback, /logout)
  server.get(
    '/auth/google',
    passport.authenticate('google', {
      // 1. pass options to passport.authenticate
      scope: ['profile', 'email'],
      prompt: 'select_account',
    }),
  );

  server.get(
    '/oauth2callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // 2. if successful, redirect user to Index page (`/`)
      res.redirect('/');
    },
  );

  server.get('/logout', (req, res, next) => {
    // 3. clear req.user property and user id from session, redirect to Login page (`/login`)
    req.logout((err) => {
      if (err) {
        next(err);
      }
      res.redirect('/login');
    });
  });
}

module.exports = setupGoogle;
