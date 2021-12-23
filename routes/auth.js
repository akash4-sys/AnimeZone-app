const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

//  /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email']}));

//Google auth callback
// get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect:'/login?api_login_error=true' }),
    async(req,res) => {
        res.status(200).render('Home/dashboard');
    }
);

//Facebook login

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect:'/login?api_login_error=true'}),
    async(req,res) => {
        res.status(200).render('Home/dashboard');
    }
)

//Discord Login
router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect:'/login?api_login_error=true'}),
    async(req,res) => {
        res.status(200).render('Home/dashboard');
    }
)

//Logout user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;