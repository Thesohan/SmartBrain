const handleSignin = (req,res,db,bcrypt)=> {
  const {email,password} = req.body;
       if(!email || !password){
         return res.status(400).json("Wrong form submission")
       }

   db.select('email','hash')
      .from('login')
      .where({email:email})
      .then(data =>{

        const isValid = bcrypt.compareSync(password,data[0].hash);
        if(isValid){
          db.select('*')
            .from('users')
            .where({email:email})
            .then(user =>{
              res.json(user[0]);
            })
            .catch(err => res.status(400).json("Unable to get user"));
        }
        else{
          res.status(400).json("Please make sure your password is correct!");
        }
        // console.log(isValid);
        // console.log(data);
      })
      .catch(err => res.status(400).json('wrong credentials'))
    };

  module.exports = {
    handleSignin: handleSignin
  };
  // res.json("signin"+res);
  // res.send("signin")
  //we can use res.json as wll as res.send
  // jso n comes up with express.
  // if(req.body.email===database.users[0].email &&
  // req.body.password===database.users[0].password){
  //   res.json('success');
  // }
  // else{
  //   res.status(400).json('error log in');
  // }
