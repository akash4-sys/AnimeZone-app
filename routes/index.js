const express = require('express');
const router = express.Router();
const {LoggedIn, Guest} = require('../middleware/authorized');
// const google_user = require('../models/google_user');

router.get('/', (req, res) => {

    if(req.isAuthenticated())
    {
        res.status(200).render('index', {
            url:'/dashboard',
            value:'DashBoard'
        });
    }
    else{
        res.status(200).render('index', {
            url:'/login',
            value:'Login/SignUp'
        });
    }
});

//Dashboard
router.get('/dashboard', LoggedIn, async(req, res) => {

    try{

        res.render('Home/dashboard', {
            name:req.user.name,
            username:req.user.username
        });

    }catch(err){
        console.error(err);
        res.status(500).render('error/500');
    }

})

module.exports = router;