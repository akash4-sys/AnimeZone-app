const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/animezone',{
                    useNewUrlParser:true, 
                    useUnifiedTopology:true
                }).then(() =>{

                    console.log("Connection Successful");

                }).catch(() =>{
                    console.log("Some error");
                })