const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const {LoggedIn, Guest} = require('../middleware/authorized');
const User = require('../models/user');
const E_verify = require('../models/email-verification');
const path = require('path');

router.get('/', Guest, (req, res) => {

    const response = {
        title: "Login",
        error: req.query.error        
    }
    res.status(200).render('Login/login-form', response);
});

router.post('/',  passport.authenticate('user-login',{

    failureRedirect: '/login?error=true',
    failureFlash: true

}), async(req, res) => {

    const user = await User.findOne({email: req.body.email});
    if(user.isVerified)
    {
        res.status(200).redirect('/dashboard');
    }
    else{
        res.status(403).render('Login/login-form', {
            verification_error:'Email id is not verified, Please check your inbox or contact us animezone@support.com'
        });
    }
});

router.get('/signup', Guest, (req, res)=>{

    res.status(200).render('Login/newuser');

})

router.post('/signup',Guest, async(req, res)=>{

    const {name,email,username,password,cpassword, emailToken, isVerified} = req.body;

    const emailTokenvalue = crypto.randomBytes(64).toString('hex');

    const msg = require('../utils/email')(username, emailTokenvalue, email);

    let errors = [];

    if(!name || !email || !username || !password || !cpassword){
        errors.push('Please fill all fields')
    }

    if(password != cpassword){ 
        errors.push('Retype the same password');
    }

    if(password.length < 5)
    {
        errors.push('Password must be at least 5 characters')
    }

    const found_user = await User.findOne({username}).lean();
    const found_email = await User.findOne({email}).lean();
    if(found_user)
    {
        errors.push('Username already taken');
    }

    if(found_email)
    {
        errors.push('Email already taken')
    }

    if(errors.length > 0){
        res.render('Login/newuser', {
            errors,
            name,
            email,
            username, 
            password,
            cpassword
        });
    }
    else
    {
        // a href = ${url} anchor tag

        const encrypted_Password = await bcrypt.hash(password, 10);
        

        var transporter = nodemailer.createTransport(nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY
        }));
          
          var mailOptions = {
            from: process.env.Protonid,
            to: email,
            subject: 'Verify your account',
            text:"This is a email verification mail",
            html: msg,
          };
          
          transporter.sendMail(mailOptions, function(error, info){

            if (error) {

              console.log(error);

            } else {

                console.log('Email sent: ' + info.response);
                res.status(202).render('Login/verification/verify-email', {
                    email
                });
            }
          });

        try{

            const record = await User.create({
                name,
                email,
                username,
                password:encrypted_Password,
                cpassword,
                // emailToken:emailTokenvalue,
                isVerified
            });

            await E_verify.create({
                email,
                emailToken:emailTokenvalue,
                isVerified
            })

            console.log("new user registered", record);

        }catch(err){    

            console.log(err);
            req.flash('error', 'Something went wrong. Please Retry or contact us at animezone@gmail.com');
            res.status(400).redirect('/signup');
        }
    }

});

router.post('/verify-email', Guest, async(req, res, next) => {

    console.log('path is working');
    try{

        const email_token = await E_verify.findOne({emailToken: req.query.token});
        // console.log(req.query.token);

        if(!email_token){

            req.flash('error',"It seems your token has expired. Please Sign up again");
            res.status(401).redirect('http://localhost/login/signup');

        }else{

            try{

                const user = await User.findOne({email: email_token.email});
                const query = {email: user.email};

                User.updateOne(query, {isVerified:true},function (error, result){
                    if (error){
                        console.log('updating database error');
                    }});

                E_verify.deleteOne({emailToken: req.query.token});

                req.flash('info', 'Email verified successfully, u can now log in'); 
                res.status(201).render('Login/login-form');

            }catch(err){

                console.log(err);
                res.status(500).render('error/500');
            }
        }
        
        
    }catch(err){

        console.log(err, "Something went wrong");
        req.flash('error', 'Something went wrong. Please Retry or contact us at animezonenoreply@gmail.com')
        res.status(400).redirect('/signup');
    }
});

module.exports = router;