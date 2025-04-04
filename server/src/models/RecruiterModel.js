import mongoose from 'mongoose'
const recruiterSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    image: {type:String, required:true},
},
    {timestamps:true,versionKey:false}

)

const recruiterModel = mongoose.model('recruiter', recruiterSchema)

export default recruiterModel;