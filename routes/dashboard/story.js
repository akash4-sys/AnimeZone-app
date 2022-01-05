const express = require('express');
const router = express.Router();
const {LoggedIn, Guest} = require('../../middleware/authorized');
const mongoose = require('mongoose');
const Story = require('../../models/story');
const { Strategy } = require('passport-local');


router.get('/', LoggedIn, async(req, res)=> {

    try{

        const story = await Story.find({user:req.user.id}).lean();

        let database = [['Genre','Written'],['Seinen',0],['Mature',0],['Popular',0],['Isekai',0],['Adventure',0]];

        for(var i=1;i<6;i++)
        {
        	let value = story.filter(storyobj => storyobj.genre == database[i][0]);
          database[i][1] = value.length;
        }
        res.status(200).render("Home/DashBoard/story/story-index", {
            story,
            database,
            url:'/dashboard',
            moment: require('moment'),
        })

    }catch(err){
        console.error(err);
        res.render('error/500');
    }

});

router.get('/create-new', LoggedIn, (req, res)=> {

  res.status(200).render("Home/DashBoard/story/story-create",{

    url:'/dashboard/your-stories',
    username:req.user.username,
    posturl:'/dashboard/your-stories/create-new'

  });

});

router.post('/create-new',LoggedIn, async(req, res)=> {

    try{

        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard/your-stories');

    }catch(err){

        console.error(err);
        res.render('error/500');
    }

});

router.get('/show-story/:id', LoggedIn, async (req, res) => {

    try{
  
      let story = await Story.findById(req.params.id).populate('user').lean();
      if(!story){
        return res.render('error/404');
      }
  
      res.render('Home/DashBoard/story/showstory',{
        story,
        storybody: story.body,
        moment: require('moment'),
        striptags: require('striptags'),
        truncate: require('truncate')
  
      })

    }catch(err){
  
      console.error(err);
      res.render('error/500');
    }
  
});

router.get('/edit/:id', LoggedIn, async (req, res) => {

    try {
      const story = await Story.findOne({_id: req.params.id,}).lean();
      let data = ['Seinen','Mature','Isekai','Adventure','Popular'];
  
      if (!story) {
        return res.render('error/404');
      }
  
      if (story.user != req.user.id) {

        res.redirect('/dashboard/your-stories');

      } else {

        var url = '/dashboard/your-stories/updated/' + story._id;
        res.render('Home/DashBoard/story/story-create', {
          story,
          data,
          username:req.user.username,
          posturl:url,
          storybody:story.body
        });

      }
    } catch (err) {

      console.error(err)
      return res.render('error/500')

    }
});

router.put('/updated/:id', LoggedIn, async(req, res)=>{

    try{
      let story = await Story.findById(req.params.id).lean();
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.render('error/500')
      } else {
  
        story = await Story.findOneAndUpdate({_id: req.params.id}, req.body,{
          new: true,
          runValidators: true
        })
        res.redirect('/dashboard/your-stories');
      }
    }catch(err){
  
      console.error(err);
      return res.render('error/500');
    }
  
});

router.delete('/delete-story/:id', LoggedIn, async(req, res) => {

    try{
  
      await Story.deleteOne({_id: req.params.id})
      res.redirect('/dashboard/your-stories');
  
    }catch(err){
  
      console.error(err);
      return res.render('error/500');

    }
  
});

module.exports = router;