import mongoose from 'mongoose'
const jobApplicationSchema = new mongoose.Schema({
    userId:{type:String, ref:'user', required:true},
    recruiterId: {type:mongoose.Schema.Types.ObjectId, ref:'recruiter', required:true}, // Reference to Recruiter Collection from RecruiterModel.js
    jobId: {type:mongoose.Schema.Types.ObjectId, ref:'jobs', required:true}, // Reference to Jobs Collection from RecruiterModel.js
    status: {type:String, default:'Pending'},
    date: {type:Number, required:true},
},
    {versionKey:false}
)
const jobApplicationModel = mongoose.model('jobApplication', jobApplicationSchema)

export default jobApplicationModel;