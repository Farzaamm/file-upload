const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
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
))

