import React, { useContext, useState } from 'react';
import { assets, viewApplicationsPageData } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';

const ViewApplications = () => {
    const companyToken = localStorage.getItem('recruiter_token');
    const {backendURL} = useContext(AppContext)
    const [ applicants, setApplicants] = useState(null)

    //function to get company job applications
    const getCompanyJobApplications = async () =>{
        try {

            const {data} = await axios.get(`${backendURL}/applicants`, {headers:{token:companyToken}})
            if(data?.status){
                setApplicants(data.applications.reverse())
            }else{
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to Update Job Applications Status
    const ChangeJobApplicationsStatus = async (id, status) =>{
        try{

            const {data} = await axios.post(`${backendURL}/change-status`, {id, status}, {headers:{token:companyToken}})
            if(data.status){
                getCompanyJobApplications()
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)
        }
    }

    useEffect(()=>{
        companyToken
        if(companyToken){
            getCompanyJobApplications()
        }
    },[companyToken])

    return  applicants === null ? 
        (
            <div className='flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
                <div className='w-10 h-10 border-6 border-gray-300 border-t-blue-400 rounded-full animate-spin'></div>
            </div>
        )
        :  applicants.length<=0 ? (
            <div className='flex items-center justify-center h-[50vh]'>
                <p className='max-sm:text-lg text-2xl'>No Applications Found!</p>
            </div>
            
        ) 
        :  
        (
        <div className='container mx-auto p-4 max-md:overflow-x-scroll'>
            <div>
                <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className='py-2 px-4 text-left'>#</th>
                            <th className='py-2 px-4 text-left'>User name</th>
                            <th className='py-2 px-4 text-left'>Job Title</th>
                            <th className='py-2 px-4 text-left'>Location</th>
                            <th className='py-2 px-4 text-left'>Resume</th>
                            <th className='py-2 px-4 text-left'>Status</th>
                        </tr>
                    </thead>
                        <tbody>
                            {applicants?.map((applicant,index)=>(
                                <tr key={index} className='text-gray-700 border-b border-gray-300'>
                                    <td className='py-2 px-4 text-center'>{index+1}</td>
                                    <td className='py-2 flex align-middle items-center max-lg:pr-10 px-4 text-left'>
                                        {!applicant?.userId.image ? (
                                                <img className='w-8 h-8 rounded-full mr-3 max-sm:mr-1' src={assets.person_icon} alt="" />
                                            )
                                            : (
                                                <img className='w-10 h-10 rounded-full mr-3 max-sm:mr-1' src={applicant?.userId.image} alt="" />

                                            )
                                        }<span>{applicant.userId.name}</span>
                                    </td>
                                    <td className='py-2 px-4 '>{applicant.jobId.title}</td>
                                    <td className='py-2 px-4 '>{applicant.jobId.location}</td>
                                    <td className='py-2 px-4 '>
                                        <a href={applicant.userId.resume} target='_blank'
                                        className='bg-blue-50 text-blue-400 px-2 py-1 rounded inline-flex gap-2 justify-evenly items-center'
                                        >
                                            Resume<img className='py-2 max-w-6' src={assets.view_icon} alt="" />
                                        </a>
                                    </td>
                                    <td className='py-2 px-4 relative text-center'>
                                        {
                                            applicant.status === "Pending"
                                            ? <div className='relative inline-block text-left group'>
                                                <button className='text-gray-500  action-button pb-2'>...</button>
                                                <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                                    <button onClick={()=>ChangeJobApplicationsStatus(applicant._id,"Accepted")} className='block w-full text-center px-4  py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                                                    <button onClick={()=>ChangeJobApplicationsStatus(applicant._id,"Rejected")} className='block w-full text-center px-4  py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                                </div>
                                            </div>
                                            : <div>{applicant.status}</div>
                                        }
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;