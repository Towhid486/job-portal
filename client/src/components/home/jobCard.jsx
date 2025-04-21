import React from 'react';
import {useNavigate} from 'react-router-dom'

const JobCard = ({job, index}) => {

    const navigate = useNavigate()

    const bgColr = index % 2 !== 0 ?  'bg-gradient-to-r from-white to-gray-200' : 'bg-gradient-to-r from-gray-200 to-white';
    const bgColor = index % 2 !== 0 ? 'bg-white' : 'bg-gray-100';

    return (
        <div className={`border border-gray-200 p-6 shadow rounded ${bgColor} hover:py-8 hover:bg-gray-200 hover:border-gray-400 transition-normal`}>
            <div className='flex justify-between items-center'>
                <h4 className='font-medium text-xl mt-2'>{job?.title}</h4>
                <img className='h-10 w-10 mt-2 rounded-full' src={job?.recruiterId?.image} alt="" />
            </div>
            
            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className="bg-blue-50 border border-blue-200 px-4 max-sm:px-3 py-1.5 rounded flex">
                    <img className='max-w-3 mr-1' src={'https://jobs.bdjobs.com/images/Location.svg'} alt="" />{job?.location}
                </span>
                <span className="bg-black text-white border border-white px-4 max-sm:px-3 py-1.5 rounded">{job?.level}</span>
                <p className='text-sm font-bold'>{job?.workPlace}</p>
                <p className='text-sm max-sm:hidden'>Vacancy <strong>{job?.vacancy}</strong></p>
            </div>

            <p className='text-gray-500 text-sm mt-2 hidden max-md:block' dangerouslySetInnerHTML={{__html:job.description.slice(0,160)+"..."}}></p>
            <p className='text-gray-500 text-sm mt-2 max-md:hidden' dangerouslySetInnerHTML={{__html:job.description.slice(0,300)+"..."}}></p>
            <div className='mt-4 flex gap-4 text-sm'>
                <button onClick={()=> {navigate(`/apply-job/${job?._id}`); scrollTo(0,0)}} className='bg-blue-600  hover:bg-blue-800 text-white px-4 py-2 rounded'>Apply now</button>
                <button onClick={()=> navigate(`/apply-job/${job?._id}`)} className='border-gray-500 hover:bg-gray-900 hover:text-white text-gray-500 border px-4 py-2 rounded max-sm:hidden'>Read More</button>
                <p className='block flex items-center gap-1 sm:ml-auto max-sm:text-[12px]'>🕑 Deadline: <strong>{new Date(job.deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })}</strong>
                </p>
            </div>
        </div>
    );
};

export default JobCard;