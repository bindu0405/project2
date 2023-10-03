const express=require('express')
const router = express.Router()
const {theaterDetails} = require("../services/theater");

//date: 03/10/2023
router.put("/insertTheaterDetails", async function(req,res){
  try{
    let data = await theaterServices.fcnInsertTheaterDetails(req);    
    res.status(200).send(data);                                                                              
                                                                                                                                                                                                                                                                                                               
  }catch(err){
    throw err;
  }
}) 

module.exports=router;
