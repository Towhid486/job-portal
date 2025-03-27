import recruiterModel from "../models/RecruiterModel.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import { EncodeToken } from "../utility/TokenHelper.js";
import jobModel from "../models/JobModel.js";

export const RecruiterRegistrationService = async (req)=>{
    const {name,email,password} = req.body;
    const imageFile = req.file;
    let recruiterExist = await recruiterModel.findOne({ email: email})
    if(recruiterExist){
        return {status:false, message:"Email already exists"}
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        let data = await recruiterModel.create({
            name,
            email,
            password:hashPassword,
            image: imageUpload.secure_url
        })
        let token = EncodeToken(data['email'],data['_id'])
        return {status:true, message:"Registration success", token:token, data:data}

    }
    catch(e){
        return {status:false, message:e}
    }
}

export const RecruiterLoginService = async (req)=>{
    try{
        let {email,password} = req.body;
        let data = await recruiterModel.findOne({email:email});
        
        if(!data){
            return {status:false, message:"User not found"}
        }
        const isPasswordValid = await bcrypt.compare(password,data?.password)
        if(isPasswordValid){
            let token = EncodeToken(data['email'],data['_id'].toString())
            return {status:true, message:"Login success", token:token, data:data}
        }
        else{
            return {status:true, message:"Invalid Email or Password"}
        }
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const ReadRecruiterDataService = async (req)=>{
    try{
        let recruiterId = req.headers['user_id']
        const data = await recruiterModel.findOne({_id:recruiterId})
        return {status:true, message:`${data.name} found success`, data:data}
    }
    catch(e){
        return {status:false, message:e}
    }
}

export const AddNewJobService = async (req)=>{
    try{
       let reqBody = req.body;
       let recruiterId = req.headers['user_id']
       reqBody.recruiterId=recruiterId
       reqBody.date = Date.now()
       let data = await jobModel.create(reqBody);
       return {status:true, message:"New job posted", data:data}
    }
    catch(e){
        return {status:false, message:e}
    }
}

export const GetJobApplicantsService = async (req)=>{
    try{

    }
    catch(e){
        return {status:false, message:e}
    }
}

export const GetRecruiterPostedJobService = async (req)=>{
    try{
        let recruiterId = req.headers['user_id']
        const data = await jobModel.find({recruiterId:recruiterId})
        if(!data){
            return {status:false, message:"No job has been posted"}
        }
        return {status:true, message:"Recruiter Posted job found", data:data}

    }
    catch(e){
        return {status:false, message:e}
    }
}

export const ChangeJobApplicationsStatusService = async (req)=>{
    try{
       

    }
    catch(e){
        return {status:false, message:e}
    }
}

export const ChangeJobVisibilityService = async (req)=>{
    try {
        const { id } = req.body;
        const recruiterId = req.headers['user_id']; 
        await jobModel.updateOne(
            { _id: id, recruiterId: recruiterId }, // Ensure only the recruiter can update
            [{ $set: { visible: { $not: "$visible" } } }] // Toggle visibility
        );
        return { status: true, message: "Job Visibility Updated"};
    } catch (e) {
        return { status: false, message: e.message };
    }
}