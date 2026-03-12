const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_STRING)
    console.log("database connected")
    }
    catch(err){
        console.log("error connecting database",err)
    }
}

module.exports = connectDB