import React from 'react';
import { Outlet } from 'react-router-dom';
import { assets, viewApplicationsPageData } from '../../assets/assets';

const ViewApplications = () => {
    return (
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
                            <th className='py-2 px-4 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewApplicationsPageData.map((applicant,index)=>(
                            <tr key={index} className='text-gray-700'>
                                <td className='py-2 px-4 border-b border-gray-300 text-center'>{index+1}</td>
                                <td className='py-2 flex align-middle items-center max-lg:pr-10 px-4 border-b border-gray-300 text-left'>
                                    <img className='w-10 h-10 rounded-full mr-3 max-sm:mr-1' src={applicant.imgSrc} alt="" />
                                    <span>{applicant.name}</span>
                                </td>
                                <td className='py-2 px-4 border-b border-gray-300 '>{applicant.jobTitle}</td>
                                <td className='py-2 px-4 border-b border-gray-300 '>{applicant.location}</td>
                                <td className='py-2 px-4 border-b border-gray-300'>
                                    <a href="" target='_blank'
                                       className='bg-blue-50 text-blue-400 px-2 py-1 rounded inline-flex gap-2 justify-evenly items-center'
                                    >
                                        Resume <img className='pr-2 py-2' src={assets.resume_download_icon} alt="" />
                                    </a>
                                </td>
                                <td className='py-2 px-4 border-b relative border-gray-300 text-center'>
                                     <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500  action-button pb-2'>...</button>
                                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                            <button className='block w-full text-center px-4  py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                                            <button className='block w-full text-center px-4  py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                        </div>
                                     </div>
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