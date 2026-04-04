const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user.js");

module.exports = () => {

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://apna-ghar-tvfe.onrender.com/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error("No email found in Google account"), null);
            }
            const email = profile.emails[0].value;
            const avatar = profile.photos?.[0]?.value;

            let user = await User.findOne({ googleId: profile.id });
            let existingUser = await User.findOne({ email });

            if (user && existingUser && user.id !== existingUser.id) {
                return done(new Error("Account conflict detected"), null);
            }

            if (user) return done(null, user);

            if (existingUser) {
                existingUser.googleId = profile.id;
                existingUser.avatar = avatar; 
                existingUser.fullname = existingUser.fullname || profile.displayName || "User";
                await existingUser.save();
                return done(null, existingUser);
            }

            const newUser = new User({
                username: email,
                email,
                fullname: profile.displayName || "Google User",
                googleId: profile.id,
                avatar: avatar,
                role: "student"
            });

            await newUser.save();
            return done(null, newUser);

        } catch (err) {
            return done(err, null);
        }
    }));

    return passport;
};
