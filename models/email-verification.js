const mongoose = require('mongoose');

const verifyschema = mongoose.Schema({

    email:{
        type:String,
        unique:true,
        sparse: true
    },

    emailToken:String,

    // users:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },

    isVerified:{
        type:Boolean,
        default:false,
        index:false
    },

    expiresAt:{
        type:Date,
        default:Date.now(),
        index: { expires: '550s'},
    }

})

const Verification = mongoose.model('Verification', verifyschema);

module.exports = Verification;