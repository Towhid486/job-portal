import React, { useContext, useEffect, useState } from 'react';
import { manageJobsData } from '../../assets/assets';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { AppContext } from './../../context/AppContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ManageJobs = () => {

    const navigate = useNavigate()
    const [jobs, setJobs] = useState(false)
    const {backendURL, companyToken, setShowRecruiterLogin} = useContext(AppContext)

    const fetchCompanyJobs = async () => {
        try{
            let {data} = await axios.get(`${backendURL}/company-jobs`, {headers:{token:companyToken}})
            if(data.status){
                setJobs(data?.data.reverse())
                console.log(data?.data);
                
            }else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    
    const changeJobVisiblity = async (id) =>{
        try{
            const {data} = await axios.post(`${backendURL}/change-visibility`,{ id }, {headers:{token:companyToken}})
            if(data.status){
                toast.success(data.message)
                fetchCompanyJobs()
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)
        }
    }
    
    useEffect(()=>{
        if(companyToken){
            fetchCompanyJobs()
        }
    },[companyToken])

    return !jobs ? 
        (
            <div className='flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
                <div className='w-10 h-10 border-6 border-gray-300 border-t-blue-400 rounded-full animate-spin'></div>
            </div>
        ) : 
        (
        <div className='container p-4 max-w-5xl'>
            <p className='py-2 px-4 text-center font-semibold'>Total {jobs.length} Jobs</p>
            <div className='max-md:overflow-x-scroll'>
                
                <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
                    <thead>
                        <tr className='py-2 border-b'>
                            <th className='py-2 px-4 text-left'>#</th>
                            <th className='py-2 px-4 text-left'>Job Title</th>
                            <th className='py-2 px-4 text-left'>Date</th>
                            <th className='py-2 px-4 text-left'>Location</th>
                            <th className='py-2 px-4 text-center'>Applicants</th>
                            <th className='py-2 px-4 text-left'>Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                            {jobs.length>0?
                                (jobs.map((job,index)=>(
                                    <tr key={index} className='text-gray-700  border-b border-gray-200'>
                                        <td className='py-2 px-4'>{index+1}</td>
                                        <td className='py-2 px-4'>{job.title}</td>
                                        <td className='py-2 px-4'>{moment(job.date).format('ll')}</td>
                                        <td className='py-2 px-4'>{job.location}</td>
                                        <td className='py-2 px-4 text-center'>{job.applicants}</td>
                                        <td className='py-2 px-4'>
                                            <input onChange={()=>changeJobVisiblity(job._id)} className='scale-125  ml-4' type="checkbox" checked={job.visible === true} />
                                        </td>
                                    </tr>
                                ))) : <tr>
                                <td colSpan={6} className='max-sm:text-left text-center py-6'>
                                  <p className='max-sm:text-lg text-2xl max-sm:pl-3'>No Applications Found!</p>
                                </td>
                              </tr>
                            }
                    </tbody>
                </table>

            </div>
            <div className='mt-4 flex justify-end'>
                <button onClick={(e)=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add New Job</button>
            </div>
        </div>
    );
};

export default ManageJobs;