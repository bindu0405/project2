const { kill } = require("process");
const theaterDetails=require("../models/theater")
const ticketBooking=require("../models/ticketbooking")

async function fcnInsertTheaterDetails(req){
    try{
        let result;
        let dbResponse;
        let check=await theaterDetails.findOne({theaterName:req.body.theaterName})
        if(check==null){
            console.log("1234")
            result=new theaterDetails({
                theaterName:req.body.theaterName,
                numberOfScreens:req.body.numberOfScreens,
                screens:req.body.screens            })
            dbResponse=await result.save();
            return {message:"new theater inserted"}
            console.log(dbResponse, "1234")            
        }
        else{
            console.log("1212")
            for(i=0;i<check.screens.length;i++){
                if(check.screens.length<check.numberOfScreens){
                    console.log(check.screens[i].screenName, "1245")
                    if(check.screens[i].screenName==req.body.screens[0].screenName){
                        for(j=0;j<check.screens[i].timings.length;j++){
                            if(check.screens[i].timings.length<check.screens[i].numberOfShows){
                                console.log("1212")
                                if(check.screens[i].timings[j].showNo==req.body.screens[0].timings[0].showNo){
                                    return {message:"show number alredy existed"}
                                }else{
                                    console.log(check.screens[i],"121234")
                                    dbResponse=await theaterDetails.findOneAndUpdate({theaterName:req.body.theaterName, screens:req.body.screens}, {$push:{timings:req.body.timings}})                                    
                                    return {message:"new show added"}    
                                }
                            }
                        }
                        return {message:"shows not available"}
                    }else{
                        dbResponse=await theaterDetails.updateOne({theaterName:req.body.theaterName}, {$push:{screens:req.body.screens}})
                        return {message:"new screen added"}

                    }                     
                }
                return {massage:"screens not available"}              
            }
            //return {massage:"screens not available"}              

        }
    }catch(err){
        throw err;
    }
}

async function fcnGetAllTheatersWithScreenNameAndStartTime(req){
    try{
        let check=await theaterDetails.find()
        console.log( "89090")        
        if(check==null){
            return {message:"theater not found"}
        }else{
            let array=[]
            for(k=0;k<check.length;k++){
                for(let i=0;i<check[k].screens.length;i++){
                    for(let j=0;j<check[k].screens[i].timings.length;j++){
                        array.push({theaterName:check[k].theaterName, screenName: check[k].screens[i].screenName,start_time:check[k].screens[i].timings[j].startTime})
                    }
                }
            }
            return array;
            console.log(array, "123")
        }

    }catch(err){
        throw err;
    }
}

async function fcnTicketBooking(req){
    try{
        let check=await theaterDetails.findOne({theaterName:req.body.theaterName})

        if(check==null){
            return {message:"theater not found"}
        }
        else{
                console.log("123");
            for(let j=0;j<check.screens.length;j++){
                if(check.screens[j].screenName==req.body.screenName){
                    console.log("123");
                    for(let k=0;check.screens[j].timings.length;k++){
                        console.log(check.screens[j].timings[k].startTime, "1567")
                        if(check.screens[j].timings[k].startTime==req.body.time){
                            console.log("123");
                            if(req.body.seatNo<=check.screens[j].capacity){
                                console.log("123");
                                let result=new ticketBooking({
                                    theaterName:req.body.theaterName,
                                    screenName:req.body.screenName,
                                    seatNo:req.body.seatNo,
                                    time:req.body.time
                                })
                                let dbResponse=await result.save();
                                return {message:"ticket booked successfully!"}
                                break;
                            }else{
                                return {message:"seat no not found"}
                            }
                        }
                    }
                    return {message:"show not available"}
                }
            }
                return {message:"screen not available"}
        }
    }catch(err){
        throw err;
    }
}





exports.theaterServices={
    fcnInsertTheaterDetails:fcnInsertTheaterDetails,
    fcnGetAllTheatersWithScreenNameAndStartTime:fcnGetAllTheatersWithScreenNameAndStartTime,
    fcnTicketBooking:fcnTicketBooking
}