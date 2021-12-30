const express = require('express');
const router = express.Router();
const {LoggedIn, Guest} = require('../middleware/authorized');
const User = require('../models/user');
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

    const user = await User.findOne({_id: req.user.id}).lean();
    const discord_avatar = "https://cdn.discordapp.com/avatars/" + user.DiscordID + "/" + user.image + ".png";
    try{

        res.render('Home/dashboard', {
            user_name:user.username,
            user_icon:user.image,
            discordid:user.DiscordID,
            discord_avatar
        });

    }catch(err){
        console.error(err);
        res.status(500).render('error/500');
    }

})

module.exports = router;