/*
res = this is working
signin ---- post   = success or fail
register ---- post = return user
profile/:userId---- GET user
image ---- PUT RETURN UPDATED OBJECT
*/


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const image = require('./controllers/image');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
//connect mysql to server
var db = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : ' ',
    database : 'smartBrain',
  }
});
/* run this command if you are facing authentication error
alter user 'root'@'localhost' identified with mysql_native_password by 'password'
*/
// console.log(db.select('*').from('users'));
// IF YOU WANT TO ACCESS DATA FROM THE database
// db.select('*').from('users').then(data=>{
//   console.log(data+"af");
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());//for security purpose (https request) ,secure request.

// app.get('/',(req,res)=>{
//   res.send(database.users );
// })

app.listen(3001,()=>{
  console.log('app is running on port 3001');
});

app.post('/signin',(req,res) =>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});//dependencies injection
//you can access the id by using req.param
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)});
// const database = {
//   users: [
//     {
//       id:'1233',
//       name: 'sohan',
//       email: 'sohankathait@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date()
//     },
//       {
//         id:'1239',
//         name: 'pitega',
//         email: 'sohankathaasdit@gmail.com',
//         password: 'cookies',
//         entries: 0,
//         joined: new Date()
//       },
//         {
//           id:'1as23',
//           name: 'mohan',
//           email: 'kathait@gmail.com',
//           password: 'cookies',
//           entries: 0,
//           joined: new Date()
//         }
//   ]
// }
