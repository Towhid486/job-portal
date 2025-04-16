import mongoose from 'mongoose'
const recruiterSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, default:""},
    image: {type:String, required:true},
},
    {timestamps:true,versionKey:false}

)

const recruiterFirebaseModel = mongoose.model('recruiters', recruiterSchema)

export default recruiterFirebaseModel;