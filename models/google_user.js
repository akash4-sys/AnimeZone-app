// const mongoose = require('mongoose');

// const google_user_schema = mongoose.Schema({

//     googleId:{
//         type: String,
//         required: true
//     },
//     displayName:{
//         type: String,
//         required: true
//     },
//     firstName:{
//         type:String,
//         required: true
//     },
//     lastName:{
//         type:String,
//         required: true
//     },
//     image:{
//         type:String
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     }
// })

// const google_user = mongoose.model('Google_user', google_user_schema);

// module.exports = google_user;








// doctype html
// head
//   meta(charset='utf-8')
//   meta(http-equiv='X-UA-Compatible' content='IE=edge')
//   title DashBoard
//   meta(name='description' content='')
//   meta(name='viewport' content='width=device-width, initial-scale=1')
//   h1 Dashboard #{name} #{username}

//   if messages.success
//       div.alert.success
//           div(class="closebtn" onclick="this.parentElement.style.display='none';") &times;
//           h3= messages.success
  
//   a(href="/auth/logout") LOGOUT
//   br
//   a(href="/login/changepassword") Change Password