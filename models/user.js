const mongoose = require('mongoose');

mongoose.Schema.Types.Boolean.convertToFalse.add('off');
mongoose.Schema.Types.Boolean.convertToTrue.add('on');

const userschema = mongoose.Schema({

        name:String,

        email:{
            type:String,
            unique:true,
            sparse:true
        },

        username:{
            type:String,
            unique:true,
            sparse:true
        },

        password:String,
        cpassword:String,          //no need to store the confirm password so make sure to delete in when uplpoading
        rememberme:Boolean,

        googleId:{
            type: String,
        },

        FacebookID:String,

        DiscordID:String,

        firstName:{
            type:String,
        },

        lastName:{
            type:String,
        },

        image:{
            type:String
        },

        google_email:{
            type:String,
            unique:true,
            sparse:true
        },

        isVerified:{
            type:Boolean,
            default:false,
            index:false
        },

        createdAt:{
            type:Date,
            default:Date.now(),
            index: {
                expires: '570s',
                partialFilterExpression: {isVerified:false}
            }
        }
})

// userschema.index({createdAt:'1'}, {expiresAfterSeconds:'10', partialFilterExpression: {isVerified:false}});

const User = mongoose.model('User', userschema);

module.exports = User;