import { AllJobsService, SingleJobDetailsService } from "../service/JobService.js"


export const AllJobs = async (req,res) =>{
    let result=await AllJobsService(req)
    return res.status(200).json(result)
}

export const SingleJobDetails = async (req,res) =>{
    let result=await SingleJobDetailsService(req)
    return res.status(200).json(result)
}
