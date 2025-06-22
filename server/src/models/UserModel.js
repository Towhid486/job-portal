import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"" },
    location: {type: String, default: ""},
    phone: {type: String, default: ""},
    resume: { type: String, default: "" },
}, { timestamps: true, versionKey: false });

const userModel = mongoose.model('user', userSchema);

export default userModel;
