const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
// const google_user = require('../models/google_user');

//changed to name from displayname

module.exports = function(passport) {
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile, done) => {
        const newuser = {
            googleId: profile.id,
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            google_email: profile.emails[0].value,
            isVerified : true
        }

        try{

            let user = await User.findOne({googleId: profile.id});

            if(user){
                done(null, user);
            }else{
                user = await User.create(newuser);
                done(null,user);
            }
        }catch(err){
            console.log(err);
            res.status(500).render('error/500');
        }
    }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async(accessToken, refreshToken, profile,done) => {

        const newuser = {
            FacebookID: profile.id,
            name: profile.displayName,
            image: profile.photos[0].value,
            email : profile.email,
            isVerified : true
        }

        try{

            let user = await User.findOne({FacebookID: profile.id});

            if(user){
                done(null, user);
            }else{
                user = await User.create(newuser);
                done(null,user);
            }
        }catch(err){
            console.log(err);
            res.status(500).render('error/500');
        }

      }
    ));

    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: "/auth/discord/callback",
        scope: ['identify', 'email', 'guilds', 'guilds.join']
      },
      async(accessToken, refreshToken, profile,done) => {

        const newuser = {
            DiscordID: profile.id,
            name: profile.username,
            email : profile.email,
            image: profile.avatar,  //gives a hashed value
            isVerified : true
        }

        try{

            let user = await User.findOne({DiscordID: profile.id});

            if(user){
                done(null, user);
            }else{
                user = await User.create(newuser);
                done(null,user);
            }
        }catch(err){
            console.log(err);
            res.status(500).render('error/500');
        }

      }
    )); 

    passport.use('user-login', new localStrategy({

            usernameField: 'email',
            passwordField: 'password'

        },function(username, password, done){

        User.findOne({email:username}, function(err, user){
    
            if(err){    return done(err);   }
            if(!user){
                return done(null, false, {message:'Incorrect Email id'});  }
    
            bcrypt.compare(password, user.password, function(err,res){
                if(err) return done(err);
    
                if(res === false){
                    return done(null, false, {message:'Incorrect password'});   }
    
                return done(null, user);
            });
        });
    }));

    passport.serializeUser((user, done) => {
        
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {

        User.findById(id, (err, user) => done(err,user));
        // User.findById(id, (err, user) => done(err,user));
    })
}