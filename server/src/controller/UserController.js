import { ApplyForJobService, getUserJobApplicationService, LoginService, ReadUserDataService, RegistrationService, UpdateUserResumeService } from "../service/UserService.js";


export const UserRegistration=async (req,res)=>{
    let result=await RegistrationService(req)
    return res.status(200).json(result)
}

export const UserLogin=async (req,res)=>{
    let result=await LoginService(req)
    if(result['status'] === true){
        //Cookie Set
        let cookieOption={expires: new Date(Date.now()+48*60*60*1000),httpOnly: false};
        //Set Cookie With Response
        res.cookie('user_token',result['token'],cookieOption)
        return res.status(200).json(result)

    }else{
        return res.status(200).json(result)
    }
}



export const ReadUserData=async (req,res)=>{
    let result=await ReadUserDataService(req)
    return res.status(200).json(result)
}

export const applyForJob=async (req,res)=>{
    let result=await ApplyForJobService(req)
    return res.status(200).json(result)
}

export const getUserJobApplication=async (req,res)=>{
    let result=await getUserJobApplicationService(req)
    return res.status(200).json(result)
}

export const UpdateUserResume=async (req,res)=>{
    let result=await UpdateUserResumeService(req)
    return res.status(200).json(result)
}
