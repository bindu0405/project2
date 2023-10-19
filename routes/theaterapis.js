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

//date: 04/10/2023
router.put("/getAllTheatersWithScreenNameAndStartTime", async function(req, res){
  try{
      let data=await theaterServices.fcnGetAllTheatersWithScreenNameAndStartTime(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})

//date: 04/10/2023, 19/10/2023
router.put("/ticketBooking", async function(req, res){
  try{
      let data=await theaterServices.fcnTicketBooking(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})

//date: 05/10/2023
router.put("/getAllTicketsInOrder", async function(req, res){
  try{
      let data=await theaterServices.fcnGetAllTicketsInOrder(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})


//date: 06/10/2023
router.put("/cancelTicket", async function(req, res){
  try{
      let data=await theaterServices.fcnCancelTicket(req);
      res.status(200).send(data);
  }catch(err){
    throw err; 
  }
})
//date: 17/10/2023
router.put("/getTheaterByMovieName", async function(req, res){
  try{
      let data=await theaterServices.fcnGetTheaterByMovieName(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})

//date: 18/10/2023
router.put("/getTheaterBYMovieNameAndStartTime", async function(req, res){
  try{
      let data=await theaterServices.fcnGetTheaterBYMovieNameAndStartTime(req);
      res.status(200).send(data);
  }catch(err){
    throw err;
  }
})


module.exports=router;
