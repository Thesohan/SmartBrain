const handleProfileGet = (req,res,db)=>{
  const {id}=req.params;
  let found = false;
  db.select('*').from('users').where({id:id})
      .then(data=>{
        if(data.length>0){
          res.json(data[0]);
        }
        else{
          res.status(400).json("Not found");
        }
      })
      .catch((err) => {res.status(404).json("error in getting user")});
};

module.exports = {
  handleProfileGet: handleProfileGet
};
