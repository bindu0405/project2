const mongoose=require("mongoose")
const newTicketSchema=new mongoose.Schema({
    theaterName: {type:String},
    screenName: {type:String},
    showNo: {type:Number},
    startTime: {type:String},
    seatNo: {type:Number},
})

const ticketBookingDetails=mongoose.model("ticketBooking", newTicketSchema);

module.exports=ticketBookingDetails;

