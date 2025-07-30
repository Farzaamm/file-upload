const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword } = require('../utils/hash');
const userService = require('../lib/user');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userService.findUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Username not found.' });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.findUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;

