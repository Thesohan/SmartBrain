
const handleRegister = (req,res,db,bcrypt) => {
     const {email,name,password} = req.body;

     if(!email || !name || !password){
       return res.status(400).json("Wrong form submission")
     }
     // console.log(req.body);
     //storing the password
     var saltRound=10;
     var hash = bcrypt.hashSync(password,saltRound);
     // console.log(hash,"hasdsfasd");

     //WE USE transaction to keep consistency within the app
     db.transaction(trx => {
       trx('login').transacting(trx).insert({
         hash: hash,
         email: email
       })
       .then(response =>{
         return trx('users')
           // .returning('*')//it tells that return all columns of the row , not supprted in mysql
           .insert({
             name:name,
             email:email,
             joined: new Date()
           })
           //response will be having id
           .then(response =>{
             console.log(response);
             return  trx.select('*').from('users').where({id:response[0]})
                 .then(data=>{
                     // console.log(data[0]);
                   //sending response back
                   res.json(data[0]);
                 })
                 .catch(err => res.status(404).json(err));
             // res.json(db('users').where({id:response}).select('*'))
             // res.json(response)
           }).catch(err=> res.status(404).json("something went wrong"));
         // .then(console.log);
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
