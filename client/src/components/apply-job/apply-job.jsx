import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment'
import { toast } from 'react-hot-toast';
import axios  from 'axios';
import SidebarJobCard from './sideJobCard';

const ApplyJob = () => {
    const {id} = useParams()
    const userToken = localStorage.getItem('user_token');
    const companyToken = localStorage.getItem('recruiter_token')
    const navigate = useNavigate()
    const [jobData, setJobData] = useState(null)
    const [ifApplied, setIfApplied] = useState()
    const {jobs, backendURL, userData} = useContext(AppContext)


    const fetchJob = async () => {
        // const data = jobs.filter((job) => job._id === id) //----Get Static/frontend details
        try{
            const {data} = await axios.get(`${backendURL}/jobs/${id}`)
            if(data.status){
                setJobData(data?.data)
            }else{
                toast.error(data?.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const isApplied = async () => {
        try{
            const {data} = await axios.get(`${backendURL}/isApplied/${id}`, {headers:{token:userToken}})
            setIfApplied(data?.status)
        }catch(error){
            toast.error(error.message)
        }
    }
    const applyHandler = async () =>{
        try {
            if(!userData){
                return toast.error('Login user to apply for jobs')
            }
            if(!userData?.resume){
                navigate('/applications')
                return toast.error('Upload resume to apply')
            }
            const {data} = await axios.post(`${backendURL}/apply-job`, {jobId:jobData?._id}, {headers:{token:userToken}})
            if(data?.status){
                toast.success(data?.message)
                await isApplied()
            }else{
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
            fetchJob()
            if(userToken){
                isApplied()   
            }
    },[id])

    return jobData ? (
        <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
            <div className='bg-white text-black rounded-lg w-full'>

                {/* Job Hero Section Start */}
                <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200' src={jobData.recruiterId.image} alt="" />
                        <div className='text-center md:text-left text-neutral-700'>
                            <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                            <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.suitcase_icon} alt="" />
                                    {jobData.recruiterId.name}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.location_icon} alt="" />
                                    {jobData.location}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.person_icon} alt="" />
                                    {jobData.level}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.money_icon} alt="" />
                                    CTC: {kconvert.convertTo(jobData.salary)}
                                </span>
                            </div>
                            
                        </div>
                    </div>

                    <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                        {
                            ifApplied ?
                                <button className='bg-black hover:bg-gray-600 transition-transform p-2.5 px-10 text-white rounded'>Already Applied</button>
                            : companyToken ? "" 
                            : <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-800 transition-transform p-2.5 px-10 text-white rounded'>Apply Now</button>
                        }
                        
                        
                        
                        <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
                    </div>
                </div>
                {/* Job Hero Section End */}

                <div className='flex flex-col lg:flex-row justify-between items-start'>
                    {/* Left Section Job Description */}
                    
                    <div className='w-full lg:w-2/3'>
                        <div className='flex justify-between max-sm:my-4'>
                            <span className='flex py-4 text-lg max-sm:text-sm'>
                                <p>💼 Vacancy:</p><strong>{jobData.vacancy}</strong>
                            </span>  
                            <span className='flex py-4 text-lg max-sm:text-sm'>
                                <p>🕑 Deadline: </p><strong>{new Date(jobData.deadline).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}</strong>
                            </span>  
                        </div>
                        
                        <h2 className='font-bold text-2xl mb-4'>Job description</h2>
                        <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
                        <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-800 transition-transform p-2.5 px-10 text-white rounded mt-10'>Apply Now</button>
                    </div>
                    {/* Right Section More Jobs */}
                    <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                        <h2>More jobs from {jobData.recruiterId.name}</h2>
                        {jobs.filter((job)=> job._id !==jobData._id && job.recruiterId._id === jobData.recruiterId._id)
                        .filter((job)=> true).slice(0,4)
                            .map((job,index)=> <SidebarJobCard key={index} index={index} job={job}/>)}
                    </div>
                </div>

            </div>
        </div>
    ) : (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-20 h-20 border-4 border-gray-300 border-t-blue-400 rounded-full animate-spin'></div>
        </div>
    )
};

export default ApplyJob;