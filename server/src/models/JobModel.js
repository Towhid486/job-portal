import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    location: {type:String, required:true},
    category: {type:String, required:true},
    level: {type:String, required:true},
    deadline: {type:String, required:true},
    workPlace: {type:String, required:true},
    vacancy: {type:String, required:true},
    salary: {type:Number,required:true},
    visible: {type:Boolean, required:true, default:true},
    recruiterId: {type:mongoose.Schema.Types.ObjectId, ref:'recruiter', required:true}, // Reference to Recruiter Collection from RecruiterModel.js
    date: {type:Number, required:true},
},
    {versionKey:false}
)
const jobModel = mongoose.model('jobs', jobSchema)

export default jobModel;