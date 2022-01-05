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
        default:'Private',
        enum:['Private', 'Published']
    },
    genre:{
        type:String,
        deafult:'Popular',
        enum:['Isekai', 'Adventure', 'Mature', 'Popular', 'Seinen']
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