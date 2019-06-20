const Clarifai = require('clarifai');
// const express = requ/ire('express');

const app = new Clarifai.App({
  apiKey:process.env.API_CLARIFAI
});

const handleApiCall=(req,res)=>{
  app.models.predict(
    
    // console.log(req.body.input);
      Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(response =>{//as long as the clarifai gives us a response do this
          res.json(response);
        })
        .catch(err=>res.status(400).json("unable to work with api"));
}


const handleImage= (req,res,db) => {

  const {id} = req.body;
  // console.log(id);
  db('users')
    .where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
      res.json(entries[0].entries);
    })
    // .then(()=>{
    //   db.select('entries').from('users').where({id:id})
    //       .then(data=>{
    //         if(data.length>0){
    //           res.status(200).json(data[0]);
    //         }
    //         else{
    //           res.status(404).json("Something went wrong!");
    //         }
    //         // console.log(data);
    //       })
      .catch((err) => {res.status(404).json("Something went wrong!")})
      // console.log(data);
    // })
    // .catch((err) => {res.status(404).json("something went wrong")})
};

module.exports = {
  handleImage:handleImage,
  handleApiCall:handleApiCall
};
