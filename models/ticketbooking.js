const mongoose=require("mongoose")
const newTicketSchema=new mongoose.Schema({
    theaterName: {type:String},
    screenName: {type:String},
    seatNo: {type:Number},
    time: {type:String}
})

const ticketBookingDetails=mongoose.model("ticketBooking", newTicketSchema);

module.exports=ticketBookingDetails;

