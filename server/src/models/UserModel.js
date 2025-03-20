import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    _id: {type: 'string',required: true, unique: true},
    name: {type: 'string',required: true},
    email: {type: 'string',required: true, unique: true},
    resume: {type: 'string'},
    image: {type: 'string',required: true}
})

const userModel = mongoose.model('user', userSchema)

export default userModel;