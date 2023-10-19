const mongoose=require('mongoose')
const dbUri='mongodb://127.0.0.1:27017/DB1';
module.exports = () => {
    return mongoose.connect('mongodb://localhost:27017/DB1',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}