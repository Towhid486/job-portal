import React, { useContext, useEffect, useState } from 'react';
import { assets } from './../../assets/assets';
import moment from 'moment'
import { AppContext } from './../../context/AppContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const Applications = () => {
    const {setShowUserLogin, backendURL, userData, userApplications, fetchUserApplications, fetchUserData} = useContext(AppContext)
    console.log(userData)
    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)
    const [saving, isSaving] = useState(false)
    console.log(resume);
    
    const userToken =  localStorage.getItem('user_token')

    const updateResume = async () =>{
        try {
            isSaving(true)
            const formData = new FormData()
            formData.append('resume', resume)
            const {data} = await axios.post(`${backendURL}/update-resume`, formData, {headers:{token:userToken}})
            isSaving(false)
            if(data?.status){
                toast.success(data?.message)
                await fetchUserData()
            }else{
                toast.error(data?.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setIsEdit(false)
        setResume(null)
    }
    useEffect(()=>{
        fetchUserApplications()
    },[userData])
    return (
        <>
            {
                userToken?  (
                <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 overflow-x-hidden'>
                    <h2 className='text-xl font-semibold'>Your Resume</h2>
                    <div className='flex gap-2 mb-6 mt-3'>
                        {
                            isEdit || userData && userData?.resume === "" ? 
                            <>
                                <label className='flex items-center' htmlFor="resumeUpload">
                                    <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>
                                        {resume ? (
                                            <>
                                            {resume.name} <img className='max-w-7 inline-block' src={assets.pdf} alt="PDF icon" />
                                            </>
                                        ) : (
                                            "Select Resume"
                                        )}
                                      </p>
                                    <input id='resumeUpload' onChange={(e)=> setResume(e.target.files[0])} accept='application/pdf' type="file" hidden/>
                                    <img src={assets.profile_upload_icon} alt="" />
                                </label>
                                <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 flex'>
                                    {
                                        saving? 
                                            <>
                                                <div className='w-5 h-5 border-4 border-gray-300 border-t-blue-400 rounded-full animate-spin'></div>Saving..
                                            </>
                                           
                                       
                                        : "Save"
                                    } 
                                </button>
                            </>
                            :
                            <div className='flex gap-2'>
                                <a href={userData?.resume} target="_blank" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'><img className='max-w-7 inline-block' src={assets.pdf}/>Resume</a>
                                <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
                            </div>
                        }
                    </div>
                    
                    <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
                    <div className='max-md:overflow-x-scroll'>
                        <table className='min-w-full bg-white border border-gray-200 rounded-lg overflow-x-scroll'>
                            <thead>
                                <tr>
                                    <th className='py-3 px-4 border-b border-gray-200 text-left'>Company</th>
                                    <th className='py-3 px-4 border-b border-gray-200 text-left'>Job Title</th>
                                    <th className='py-3 px-4 border-b border-gray-200 text-left'>Location</th>
                                    <th className='py-3 px-4 border-b border-gray-200 text-left'>Date</th>
                                    <th className='py-3 px-4 border-b border-gray-200 text-left'>Status</th>
                                </tr>
                            </thead>

                            {
                                userApplications===null ?(
                                    <div className='flex absolute left-1/2 items-center justify-center pt-3'>
                                        <div className='w-6 h-6 border-4 border-gray-300 border-t-blue-400 rounded-full animate-spin'></div>
                                    </div>
                                )
                                : userApplications.length<=0? (
                                    <p className='text-xl mb-4 absolute left-6/14 pt-4'>No Job Applied!</p>
                                )
                                : 
                                <tbody>
                                    {userApplications.map((job,index)=>(
                                        <tr className='border-b border-gray-200' key={index}>
                                            <td className='px-4 py-3'>
                                            <div className='flex items-center gap-2'>
                                                <img className='w-8 h-8 rounded-full object-cover' src={job?.recruiterId.image} alt="" />
                                                <span className="whitespace-nowrap">{job?.recruiterId.name}</span>
                                            </div>
                                            </td>
                                            <td className='px-4 py-2 font-semibold'>{job?.jobId.title}</td>
                                            <td className='px-4 py-2'>{job?.jobId.location}</td>
                                            <td className='px-4 py-2'>{moment(job.date).format('ll')}</td>
                                            <td className='px-4 py-2'>
                                                <span className={`${job?.status==='Accepted'? 'bg-green-100' : job?.status==='Rejected'? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`} >
                                                    {job?.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            }
                    
                        </table>
                    </div>
                    

                </div>
                )
                : setShowUserLogin(true)
            }
        </>
        
    );
};

export default Applications;