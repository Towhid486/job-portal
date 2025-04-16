import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default:"" },
    resume: { type: String, default: "" },
    image: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const userFirebaseModel = mongoose.model('users', userSchema);

export default userFirebaseModel;
