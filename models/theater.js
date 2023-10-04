const mongoose=require("mongoose")

const newTheaterSchema=new mongoose.Schema({
    theaterName: {type:String},
    numberOfScreens: {type:Number},
    screens:[{
        screenName: {type:String},
        numberOfShows: {type:Number},
        timings:[{
            showNo: {type:Number},
            startTime: {type:String} ,     //{type:Date, required:true},
            endTime: {type:String}      //{type:Date, required:true}
        }],
        capacity: {type:Number},
        date: {type:Date}
    }]
});

const newTheaterDetails=mongoose.model("Theater", newTheaterSchema);

module.exports=newTheaterDetails;