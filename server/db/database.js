const mongoose =require("mongoose")
// const URI=  "mongodb://127.0.0.1:27017/MERN";
const URI=process.env.MONGO_URL 
// console.log('the url ',process.env.MONGO_URL);
const mongoDB=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connect is sucessfull with mongodb")
    } catch (error) {
        console.log("connection failed")
        console.log(error.message)
        // console.log(error)
        process.exit(0)
    }
}
module.exports= mongoDB