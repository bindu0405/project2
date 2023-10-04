const express=require('express')
const router = express.Router()
const {theaterServices} = require("../services/theater");

//date: 03/10/2023
router.put("/insertTheaterDetails", async function(req,res){
  try{
    console.log("pop")
    let data = await theaterServices.fcnInsertTheaterDetails(req);    
    res.status(200).send(data);                                                                              
                                                                                                                                                                                                                                                                                                               
  }catch(err){
    throw err;
  }
}) 

router.put("/getAllTheatersWithScreenNameAndStartTime", async function(req, res){
  try{
      let data=await theaterServices.fcnGetAllTheatersWithScreenNameAndStartTime(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})

router.put("/ticketBooking", async function(req, res){
  try{
      let data=await theaterServices.fcnTicketBooking(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})

module.exports=router;
