const mongoose = require('mongoose');

const storyschema = mongoose.Schema({

    title:String,
    body:String,

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type:String,
        default:'private',
        enum:['private', 'published']
    },
    genre:{
        type:String,
        deafult:'popular',
        enum:['isekai', 'adventure', 'mature', 'popular', 'seinen']
    },
    email:String,
    username:String,
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

const Story = mongoose.model("Story", storyschema);

module.exports = Story;