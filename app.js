const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const striptags = require('striptags');
const moment = require('moment');
const truncate = require('truncate');
require('./config/db');
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 80;

//Load configuration
dotenv.config({path:'./config/config.env'})

//Passport configuration
require('./config/passport')(passport);

//intializing express and session and passport
const app = express();
app.use(session({
    secret:'9809060498801mmtalipmneroc4tqr5nqu74r6bhjhgvappsthifnsdnflkuwioersalkjrandosdmsfdkldfas',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/animezone'})
}));

app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//static
app.use(express.static(path.join(__dirname, 'public')));

//Pug
app.set('view engine', 'pug');

//Method-Override
app.use(methodOverride(function(req, res) {

    if(req.body && typeof req.body === 'object' && '_method' in req.body) {

        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//Currently logged in
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/login', require('./routes/login'));
app.use('/dashboard/your-stories', require('./routes/dashboard/story'));

app.get('*', (req,res) => {
    res.status(404).render('error/404');
});

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
});