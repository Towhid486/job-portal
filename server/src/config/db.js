import mongoose from 'mongoose'

//Function to connect to the MongoDB Database
const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=> console.log("🟠 Database Connected"))
        await mongoose.connect(process.env.MONGODB_URL,{autoIndex:true})
    }catch(e){
        console.log(`Error connecting to MongoDB: ${e.message}`)
    }

}
export default connectDB;