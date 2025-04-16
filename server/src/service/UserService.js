import jobApplicationModel from '../models/JobApplicationModel.js';
import jobModel from '../models/JobModel.js';
import { EncodeToken } from '../utility/TokenHelper.js';
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import userModel from './../models/UserModel.js';
import userFirebaseModel from '../models/firebase_auth/UserAuthModel.js';



export const FirebaseLoginService = async (req) => {
    const { name, email, image } = req.body

    let UserExist = await userModel.findOne({ email: email });
    if (UserExist) {
        let token = EncodeToken(UserExist.email, UserExist._id);
        return { status: true, message: "Firebase Login success", token: token, data: UserExist };
    }
    try {
        // Create user in DB
        let data = await userFirebaseModel.create({
            name,
            email,
            image
        });
        // Generate Token
        let token = EncodeToken(data.email, data._id);
        return { status: true, message: "Firebase Registration success", token: token, data: data };
    } catch (e) {
        return { status: false, message: e.toString() };
    }
};


export const RegistrationService = async (req) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    let userExist = await userModel.findOne({ email: email });
    if (userExist) {
        return { status: false, message: "Email already exists" };
    }
    try {
        // Image upload to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        // Create user in DB
        let data = await userModel.create({
            name,
            email,
            password,
            image: imageUpload.secure_url,
        });
        // Generate Token
        let token = EncodeToken(data.email, data._id);
        return { status: true, message: "Registration success", token: token, data: data };
    } catch (e) {
        return { status: false, message: e.toString() };
    }
};

export const LoginService = async (req)=>{
    try{
        let {email,password} = req.body;
        let data = await userModel.findOne({email:email});

        if(password===data?.password){
            let token = EncodeToken(data['email'],data['_id'].toString())
            return {status:true, message:"Login success", token:token, data:data}
        }
        else{
            return {status:false, message:"Invalid Email or Password"}
        }
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const ReadUserDataService = async (req)=>{
    try{
       let userId = req.headers.user_id;
       const data = await userModel.findOne({_id:userId})
        if(!data){
            return{status:false, message:"User not found"}
        }
        return {status:true, data:data}
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const AlreadyAppliedJobService = async (req)=>{
    try{
       let userId = req.headers.user_id;
       let {jobId} = req.params;
       const data = await jobApplicationModel.findOne({userId:userId, jobId:jobId})
        if(data){
            return{status:true, message:"Already Applied"}
        }else{
           return {status:false, message:"Apply Now"} 
        }
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const ApplyForJobService = async (req)=>{
    try{
        let {jobId} = req.body;
        let userId = req.headers.user_id;
        req.body.userId=userId
        const isAlreadyApplied = await jobApplicationModel.find({jobId,userId})
        if(isAlreadyApplied.length>0){
            return{status:false, message:"Already applied"}
        }

        const jobData = await jobModel.findOne({_id:jobId})
        if(!jobData){
            return{status:false, message:"Job not found"}
        }
        req.body.recruiterId=jobData.recruiterId;
        req.body.date=Date.now();
        await jobApplicationModel.create(req.body)

        return {status:true, message:"Applied Successfully",}

    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const getUserJobApplicationService = async (req)=>{
    try{
        let userId = req.headers.user_id;
        const applications = await jobApplicationModel.find({userId:userId})
        .populate('recruiterId', 'name email image')
        .populate('jobId','title description location category level salary')
        .exec()

       if(!applications){
        return{status:false, message:"No job applications found for this user"}
       }

        return {status:true, message:"User Applications Found", applications}

    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const UpdateUserResumeService = async (req)=>{
    try{
       
        let userId = req.headers.user_id;
        let resumeFile = req.file;

        // const userData = await userModel.findOne({_id: userId});
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            let resume = resumeUpload.secure_url
            await userModel.updateOne({_id:userId},{resume:resume})

            return {status:true, message:"Your Resume Updated",}
        }
        else{
            return {status:false, message:"Upload Your Resume"}
        }
    }
    catch(e){
        return {status:false, message:e.message}
    }
}