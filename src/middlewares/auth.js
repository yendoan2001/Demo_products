const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require("../models/user");

passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        let user = await UserModel.findOne({
            email: username,
            password: password
        })
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    }catch (e) {
        return cb(e);
    }

}))
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user._id, email: user.email, name: user.name });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = passport;