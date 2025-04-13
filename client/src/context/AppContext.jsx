import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from 'react-toastify';
import axios from "axios";

export const AppContext = createContext()
export const AppContextProvider = (props) =>{

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })
    

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])


    const [showUserLogin, setShowUserLogin] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState(null)

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)


    // Function to fetch jobs
    const fetchJobs = async() => {
        // setJobs(jobsData)
        try {
            
            const {data} = await axios.get(`${backendURL}/jobs`)
            if(data?.status){
                setJobs(data?.data)
            }else{
                toast.error(data?.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to fetch User data
    const fetchUserData = async () => {
        try{
            const {data} = await axios.get(`${backendURL}/user-data`, {headers:{token:userToken}})
            if(data?.status){
                setUserData(data?.data)                
            }else{
                toast.error(data?.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    //function to fetch user's applied applications data
    const fetchUserApplications = async () =>{
        try{
            const userToken =  localStorage.getItem('user_token')
            const {data} = await axios.get(`${backendURL}/applications`, {headers:{token:userToken}})
            if(data?.status){
                setUserApplications(data?.applications)
            }else{
                toast.error(data?.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const fetchCompanyData = async () => {
        try{
            const {data} = await axios.get(`${backendURL}/company`, {headers:{token:companyToken}})
            if(data.status){
                setCompanyData(data?.data)
                console.log(data);
                
            }else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        fetchJobs()
        const storedUserToken = localStorage.getItem('user_token')
        const storedCompanyToken = localStorage.getItem('recruiter_token')
        if(storedUserToken){
            setUserToken(storedUserToken)
        }
        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    },[])

    useEffect(()=>{
        if(userToken){
            fetchUserData()
            fetchUserApplications()
        }
        if(companyToken){
            fetchCompanyData()
        }
    },[userToken,companyToken])


    const value = {
        backendURL,
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,

        showUserLogin, setShowUserLogin,
        userToken, setUserToken,
        userData, setUserData, fetchUserData,
        userApplications, setUserApplications,
        fetchUserApplications,
        
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}