import { AddNewJobService, ChangeJobVisibilityService, GetJobApplicantsService, GetRecruiterPostedJobService, ReadRecruiterDataService, RecruiterLoginService, RecruiterRegistrationService } from './../service/RecruiterService.js';

export const RecruiterRegistration=async (req,res)=>{
    let result=await RecruiterRegistrationService(req)
    if(result['status'] === true){
        //Cookie Set
        let cookieOption={expires: new Date(Date.now()+48*60*60*1000),httpOnly: false};
        //Set Cookie With Response
        res.cookie('recruiter_token',result['token'],cookieOption)
        return res.status(200).json(result)

    }else{
        return res.status(200).json(result)
    }
}

export const RecruiterLogin=async (req,res)=>{
    let result=await RecruiterLoginService(req)
    if(result['status'] === true){
        //Cookie Set
        let cookieOption={expires: new Date(Date.now()+48*60*60*1000),httpOnly: false};
        //Set Cookie With Response
        res.cookie('recruiter_token',result['token'],cookieOption)
        return res.status(200).json(result)

    }else{
        return res.status(200).json(result)
    }
}

export const RecruiterLogout=async (req,res)=>{
    let cookieOption={expires: new Date(Date.now()-48*60*60*1000),httpOnly: false};
    res.cookie('recruiter_token',"",cookieOption)
    return res.status(200).json({status:"success", message:"Recruiter Logout Success"})
}
export const ReadRecruiterData=async (req,res)=>{
    let result=await ReadRecruiterDataService(req)
    return res.status(200).json(result)
}

export const AddNewJob=async (req,res)=>{
    let result=await AddNewJobService(req)
    return res.status(200).json(result)
}

export const GetJobApplicants=async (req,res)=>{
    let result=await GetJobApplicantsService(req)
    return res.status(200).json(result)
}

export const GetRecruiterPostedJob=async (req,res)=>{
    let result=await GetRecruiterPostedJobService(req)
    return res.status(200).json(result)
}

export const ChangeJobApplicationsStatus=async (req,res)=>{
    let result=await ChangeJobApplicationsStatusService(req)
    return res.status(200).json(result)
}

export const ChangeJobVisibility=async (req,res)=>{
    let result=await ChangeJobVisibilityService(req)
    return res.status(200).json(result)
}
