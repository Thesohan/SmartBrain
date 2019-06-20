
const handleRegister = (req,res,db,bcrypt) => {
     const {email,name,password} = req.body;
console.log(email,name,password,"dfg");
     if(!email || !name || !password){
       return res.status(400).json("Wrong form submission")
     }
     // console.log(req.body);
     //storing the password
     var saltRound=10;
     var hash = bcrypt.hashSync(password,saltRound);
     console.log(hash,"hasdsfasd");

// db('users')
// .returning('*')
// .insert({
//   email:email,
//   name:name,
//   joined: new Date()
// })
// .then(user=>{
//   res.json(user[0]);
// })
// .catch(err=>res.status(400).json('unaasd'))
// };
//

     //WE USE transaction to keep consistency within the app

     db.transaction(trx => {
       // console.log(trx);
       trx.insert({
         hash: hash,
         email: email
       })
       .into('login')
       .returning('email')
       .then(loginEmail =>{
         console.log(loginEmail);
         return trx('users')
           .returning('*')//it tells that return all columns of the row , not supprted in mysql
           .insert({
             name:name,
             email:loginEmail[0],
             joined: new Date()
           })
           //response will be having id
           .then(user =>{
             // console.log("userse",user);
             res.json(user[0]);
           })
           .catch(err=> res.status(404).json("something went wrong"));
           // whenever you do a post request make sure to return a response
           // res.json(database.users[database.users.length-1]);
         })
       .then(trx.commit)
       .catch(trx.rollback)
   })
   .catch(err => res.status(400).json('unable to register'));
 }

module.exports ={
  handleRegister : handleRegister
};
