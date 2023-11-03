//const { kill } = require("process");
const theaterDetails=require("../models/theater")
const ticketBooking=require("../models/ticketbooking")

// async function fcnInsertTheaterDetails(req){
//     try{
//         let result;
//         let dbResponse;
//         let check=await theaterDetails.findOne({theaterName:req.body.theaterName})
//         if(check==null){
//             result=new theaterDetails({
//                 theaterName:req.body.theaterName,
//                 numberOfScreens:req.body.numberOfScreens,
//                 screens:req.body.screens            })
//             dbResponse=await result.save();
//             return {message:"new theater inserted"}
//         }
//         else{
//             for(i=0;i<check.screens.length;i++){
//                 if(check.screens.length<check.numberOfScreens || check.screens[i].screenName==req.body.screens[0].screenName){
//                     for(j=0;j<check.screens[i].timings.length;j++){
//                         if(check.screens[i].timings.length<check.screens[i].numberOfShows){
//                             if(check.screens[i].timings[j].showNo==req.body.screens[0].timings[0].showNo){
//                                  return {message:"show number alredy existed"}
//                             }else{
//                                 var res= check.screens[i].timings.push(req.body.screens[0].timings[0])
//                                 dbResponse=await check.save();
//                                 //dbResponse=await theaterDetails.findByIdAndUpdate({ theaterName: check.theaterName, "screens.screenName": check.screens[i].screenName },{$push:{"screens.$.timings":req.screens[0].timings[0]}})                                    
//                                 return {message:"new show added"}    
//                             }
//                         }
//                     }
//                     return {message:"shows not available"}
//                 }
//                  return {massage:"screens not available"}          
            
//             }                   
//             dbResponse=await theaterDetails.updateOne({theaterName:req.body.theaterName}, {$push:{screens:req.body.screens}})
//             return {message:"new screen added"}   
//         }
//     }catch(err){
//         throw err;
//     }
// }

 async function fcnInsertTheaterDetails(req) {
    try {
        let result;
        let dbResponse;
        let check = await theaterDetails.findOne({ theaterName: req.body.theaterName });
        if (check == null) {
            result = new theaterDetails({
                theaterName: req.body.theaterName,
                numberOfScreens: req.body.numberOfScreens,
                screens: req.body.screens,
            });
            dbResponse = await result.save();
            return { message: "new theater inserted" };
        } else {
            for (let i = 0; i < check.screens.length; i++) {
                if (check.screens[i].screenName === req.body.screens[0].screenName) {
                    for (let j = 0; j < check.screens[i].timings.length; j++) {
                        if (check.screens[i].timings[j].showNo === req.body.screens[0].timings[0].showNo) {
                            //Update the timing here
                            check.screens[i].timings[j] = req.body.screens[0].timings[0];
                            dbResponse = await check.save();
                            return { message: "timings updated for existing screen" };
                        }
                    }
                    //If the show number is not found, add new timing
                    check.screens[i].timings.push(req.body.screens[0].timings[0]);
                    dbResponse = await check.save();
                    return { message: "new timing added for existing screen" };
                }
            }
            //If the screen name is not found, add new screen
            check.screens.push(req.body.screens[0]);
            dbResponse = await check.save();
            return { message: "new screen added" };
        }

        
        
    } catch (err) {
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
                        if(check.screens[j].timings[k].startTime==req.body.startTime || check.screens[j].timings[k].showNo==req.body.showNo){
                            console.log("123");
                            if(req.body.seatNo<=check.screens[j].capacity ){
                                let checkSeat=await ticketBooking.findOne({showNo:req.body.showNo, seatNo:req.body.seatNo, startTime:req.body.startTime})
                                console.log(checkSeat, "121212")
                                if(checkSeat==null || checkSeat.seatNo!=req.body.seatNo || checkSeat.startTime!=req.body.startTime){
                                    console.log("123");
                                    let result=new ticketBooking({
                                        theaterName:req.body.theaterName,
                                        screenName:req.body.screenName,
                                        showNo:req.body.showNo,
                                        startTime:req.body.startTime,
                                        seatNo:req.body.seatNo
                                    })
                                    let dbResponse=await result.save();
                                    return {message:"ticket booked successfully!"}
                                }
                                else{
                                    return {message:"seatNO already booked!"}
                                }
                            }
                            else{
                                return {message:"seat no not available"}
                            }
                        }
                        //else{
                         //   return {messge:"show time not found."}
                       // }
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

async function fcnGetAllTicketsInOrder(req){
    try{
        let check=await ticketBooking.find({theaterName:req.body.theaterName, screenName:req.body.screenName});
        console.log(check);
        if(check.length==0){
            return {message:"theater not found"}
        }
           check.map(str => {
            let seatNo=new Number(str.seatNo);
          }); 
          let order = check.sort(
            (strA, strB) => Number(strA.seatNo) - Number(strB.seatNo),
          );
        
          console.log(order, "++++++")
          return order;

    }catch(err){
        throw err;
    }
}

async function fcnCancelTicket(req){
    try{
        let check=await ticketBooking.find({seatNo:req.body.seatNo})
        console.log(check, "121212")
        if(check.length==0){
            return {message:"seatNo does not booked to cancel"}
        }
        else{
            let dbResponse=await ticketBooking.findOneAndDelete({theaterName:req.body.theaterName, screenName:req.body.screenName, startTime:req.body.startTime, seatNo:req.body.seatNo})
            return {message:"ticket canceled succesfully!"}
        }
    }catch(err){
        throw err;
    }
}

async function fcnGetTheaterByMovieName(req){
    try{
        let arr=[]
        let check=await theaterDetails.find();
        console.log(check, "1223")
        for(let i=0;i<check.length;i++){
            for(let j=0;j<check[i].screens.length;j++){
                if(req.body.movieName==check[i].screens[j].movieName){
                    console.log(check[i].theaterName, check[i].screens[j].movieName, "121212")
                    arr.push({"theaterName":check[i].theaterName, "screenName":check[i].screens[j].screenName, "movieName":check[i].screens[j].movieName, "noOfShows":check[i].screens[j].numberOfShows})
                } 
            }           
        }
        console.log(arr)
        return arr;


    }catch(err){
        throw err;
    }
}

async function fcnGetTheaterBYMovieNameAndStartTime(req){
    try{
        let arr=[]
        let check=await theaterDetails.find();
        console.log(check, "343434")
        for(let i=0;i<check.length;i++){
            for(let j=0;j<check[i].screens.length;j++){
                if(req.body.movieName==check[i].screens[j].movieName){
                    const currentDate = new Date(); 
                    console.log(currentDate, "12121")
                    const timestamp = currentDate.toTimeString();
                    console.log(`Time: ${currentDate.toTimeString()}`);
                    for(k=0;k<check[i].screens[j].timings.length;k++){   
                        console.log(timestamp, check[i].screens[j].timings[k].startTime, "12121")
                        if(check[i].screens[j].timings[k].startTime>timestamp){
                            arr.push({"theaterName":check[i].theaterName,"movieName":check[i].screens[j].movieName, "screenName":check[i].screens[j].screenName,"showNo":check[i].screens[j].timings[k].showNo,"startTime":check[i].screens[j].timings[k].startTime})
                        }
                    }
                }
            }
        }
        return arr;
    }catch(err){
        throw err;
    }
}

async function fcnChangeSeatNoForTicketBooking(req){
    try{
        let check=await ticketBooking.find({theaterName:req.body.theaterName, screenName:req.body.screenName, showNo:req.body.showNo,  startTime:req.body.startTime})
        console.log(check, "2321") 
            for(i=0;i<check.length;i++){
                console.log(check[i],req.body.seatNo, "4545454")
                if(check[i].seatNo!=req.body.changeSeatNo && check[i].seatNo==req.body.seatNo){
                    console.log( req.body.changeSeatNo, "23232")
                    let dbResponse=await  ticketBooking.findOneAndUpdate(check[i], {$set:{seatNo:req.body.changeSeatNo}})
                    console.log(dbResponse, "9090")
                    return {message:"seatNo changed succssfully"}
                }
            }
            return {message:
                "seatNo already booked"}
        
    }catch(err){
        throw err;
    }
}


exports.theaterServices={
    fcnInsertTheaterDetails:fcnInsertTheaterDetails,
    fcnGetAllTheatersWithScreenNameAndStartTime:fcnGetAllTheatersWithScreenNameAndStartTime,
    fcnTicketBooking:fcnTicketBooking,
    fcnGetAllTicketsInOrder:fcnGetAllTicketsInOrder,
    fcnCancelTicket:fcnCancelTicket,
    fcnGetTheaterByMovieName:fcnGetTheaterByMovieName,
    fcnGetTheaterBYMovieNameAndStartTime:fcnGetTheaterBYMovieNameAndStartTime,
    fcnChangeSeatNoForTicketBooking:fcnChangeSeatNoForTicketBooking

    
}