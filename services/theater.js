const theaterDetails=require("../models/theater")

async function fcnInsertTheaterDetails(req){
    try{
        let result;
        let dbResponse;
        let check=await theaterDetails.findOne({theaterName:req.body.theaterName})
        if(check=null){
            result=new theaterDetails({
                theaterName:req.body.theaterName,
                numberOfScreens:req.body.numberOfScreens,
                screens:[{
                    screenName:req.body.screenName,
                    numberOfShows:req.body.numberOfShows,
                    timings:[{
                        showNo:1,
                        startTime:req.body.startTime,
                        endTime:req.body.endTime
                    }],
                    capacity:req.body.capacity,
                    date:req.body.date
                }]
            })
            dbResponse=await result.save();
            console.log(dbResponse, "1234")            
        }
        else{
            for(i=0;i<check.screens.length;i++){
                if(check.screens.length<check.numberOfScreens){
                    if(check.screens[i].screenName==req.body.screenName){
                        for(j=0;j<check.screens[i].timings.length;j++){
                            if(check.screens[i].timings.length<check.screens[i].numberOfShows){
                                let a=check.screens[i].timings.length+1
                                if(check.screens[i].timings[j].showNo!=req.body.showNo){
                                    dbResponse=await theaterDetails.updateOne({theaterName:req.body.theaterName, screens:req.body.screens}, {$push:{timings:[{showNo:a, startTime:req.body.startTime, endTime:req.body.endTime}]}})                                    
                                    return {message:"new show added"}    
                                }
                            }
                        }
                        return {message:"shows not available"}
                    }else{
                        dbResponse=await theaterDetails.updateOne({theaterName:req.body.theaterName}, {$push:{screens:[{
                            screenName:req.body.screenName,
                            numberOfShows:req.body.numberOfShows,
                            timings:[{
                                showNo:1,
                                startTime:req.body.startTime,
                                endTime:req.body.endTime
                            }],
                            capacity:req.body.capacity,
                            date:req.body.date
                        }]}})
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

exports.theaterServices={
    fcnInsertTheaterDetails:fcnInsertTheaterDetails
}