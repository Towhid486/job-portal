import recruiterModel from "../models/RecruiterModel.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import { EncodeToken } from "../utility/TokenHelper.js";
import jobModel from "../models/JobModel.js";
import mongoose from "mongoose";
import jobApplicationModel from "../models/JobApplicationModel.js";
import recruiterFirebaseModel from "../models/firebase_auth/RecruiterAuthModel.js";

export const RecruiterFirebaseLoginService = async (req) => {
    const { name, email, image } = req.body
    let RecruiterExist = await recruiterModel.findOne({ email: email });
    if (RecruiterExist) {
        let token = EncodeToken(RecruiterExist.email, RecruiterExist._id);
        return { status: true, message: "Firebase Login success", token: token, data: RecruiterExist };
    }
    try {
        // Create user in DB
        let data = await recruiterFirebaseModel.create({
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
        return {status:false, message:e.message}
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
        return {status:false, message:e.message}
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
        return {status:false, message:e.message}
    }
}

export const GetRecruiterJobApplicantsService = async (req)=>{
    // try{
    //     let recruiterId = new mongoose.Types.ObjectId(req.headers["user_id"]);
    //     const matchRecruiter = {$match: { recruiterId: recruiterId }}
    //     // Lookup and unwind user
    //     const JoinWithUser = {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'} };
    //     // const unwindUser = { $unwind: '$user' }; 

    //     const JoinWithJob = {$lookup: {from: 'jobs', localField: 'jobId', foreignField: '_id', as: 'job'} };
    //     // const unwindJob = { $unwind: '$job' };

    //     // Optional project stage
    //     const projectFields = {
    //         $project: { _id: 1, user: {name: 1,image: 1,resume: 1}, job: {title: 1,location: 1,category: 1,level: 1,salary: 1 } }
    //     };

    //     // Final aggregation
    //     const applications = await jobApplicationModel.aggregate([
    //         matchRecruiter,
    //         JoinWithUser,
    //         // unwindUser,
    //         JoinWithJob,
    //         // unwindJob,
    //         projectFields
    //     ]);
    //     return { status: true, message:"Applications Found", applications };

    // }

    try{
        
        let recruiterId = req.headers['user_id']
        const applications = await jobApplicationModel.find({recruiterId:recruiterId})
        .populate('userId', 'name image resume')
        .populate('jobId', 'title location category level salary')
        .exec()
        return {status:true, applications}

    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const GetRecruiterPostedJobService = async (req)=>{
    try{
        let recruiterId = new mongoose.Types.ObjectId(req.headers["user_id"]);
        let matchRecruiter = {$match: { recruiterId: recruiterId }}

        let joinWithJobApplications = {$lookup: {from: "jobapplications",localField: "_id", foreignField: "jobId",as: "applicants"}}

        let countApplicants = {$addFields: {applicants: { $size: "$applicants" }}}

        const jobsData = await jobModel.aggregate([
            matchRecruiter, joinWithJobApplications,countApplicants
        ]);
        return { status: true, data:jobsData };
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const ChangeJobApplicationsStatusService = async (req)=>{
    try{
       
        const {id, status} = req.body
        await jobApplicationModel.updateOne({_id:id}, {status:status})

        return { status: true, message: "Applications Status Changed"};
    }
    catch(e){
        return {status:false, message:e.message}
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