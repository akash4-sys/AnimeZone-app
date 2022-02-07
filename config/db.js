const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGODB_URI,{
                    useNewUrlParser:true, 
                    useUnifiedTopology:true
                }).then(() =>{

                    console.log("Connection Successful");

                }).catch(() =>{
                    console.log("Database error");
                })