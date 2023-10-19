const express = require("express");
const bodyParser=require('body-parser')
let port=8500;
//local imports
const connectDb=require('./db.js')
const theaterRoutes= require('./routes/theaterapis.js')
const app = express();
//middleware
app.use(bodyParser.json())
app.use(theaterRoutes)
connectDb()
.then(()=>{
    console.log('dbconnection succeeded')
    console.log("fksljdssd")
    app.listen(port,
    ()=>console.log('server started at: 8500'))
})
.catch(err=>console.log(err));
