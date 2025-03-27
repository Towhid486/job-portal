import jobModel from "../models/JobModel.js"

export const AllJobsService = async (req)=>{
    try{
        const data = await jobModel.find({visible:true})
        .populate({path:'recruiterId', select:'-password'});

        return {status:true, message:"All the visible job found", data:data}
    }
    catch(e){
        return {status:false, message:e.message}
    }
}

export const SingleJobDetailsService = async (req)=>{
    try{
       
        const {id} = req.params;
        console.log(id)
        let data = await jobModel.findOne({_id:id})
        .populate({path:'recruiterId', select:'-password'})
        if(!data){
            return {status:false, message:"Job not found"}
        }
        return {status:true, message:"Job Details Found", data:data}
    }
    catch(e){
        return {status:false, message:e.message}
    }
}