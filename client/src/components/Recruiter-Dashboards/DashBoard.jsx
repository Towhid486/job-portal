import React, { useContext, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import Footer from '../Footer';

const DashBoard = () => {
    const {backendURL, setShowRecruiterLogin,companyToken, setCompanyToken, companyData} = useContext(AppContext)
    const navigate = useNavigate()
    const [showOption, setShowOption] = useState(false)

    const logout = async () => {
        await axios.post(`${backendURL}/recruiter-logout`,{}, {withCredentials: true})
        localStorage.removeItem('recruiter_token')
        setCompanyToken(null)
        navigate('/')
    }
    return (
        <>
        {
            companyToken ? (
                <div className='min-h-screen min-w-[320px] max-w-[1980px] mx-auto'>
            
                    {/* Navbar for Recruiter Panel */}
                    <div className='shadow py-4'>
                        <div className='px-5 flex justify-between items-center'>
                            <img onClick={(e)=>navigate('/')} className='max-w-40 cursor-pointer' src={assets.logo} alt="" />
                            <div className='flex items-center gap-3'>
                                <Link to={'/'}>Jobs</Link>
                                <p className='max-sm:hidden'>Welcome, {companyData?.name}</p>
                                <div className='relative group'>
                                    <img onClick={ (e) => setShowOption(prev => !prev)} className='w-8 border border-gray-200 rounded-full cursor-pointer' src={companyData?.image} alt="" />
                                    <div className={`${showOption?"":"hidden"} absolute top-0 right-0 z-10 text-black rounded mt-12`}>
                                        <ul className='list-none m-0 p-2 bg-light rounded-md border border-gray-200 text-sm'>
                                            <li onClick={(e)=>logout()} className='py-1 px-2 bg-black text-white cursor-pointer pr-10'>Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start'>
                        {/* Left Sidebar to Add Job, Manage Jobs & View Applications */}
                        <div className='inline-block min-h-screen border-r-2 border-gray-200'>
                            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                                    <img className='min-w-4' src={assets.add_icon} alt="" />
                                    <p className='max-sm:hidden '>Add Job</p>
                                </NavLink>

                                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                                    <img className='min-w-4' src={assets.home_icon} alt="" />
                                    <p className='max-sm:hidden '>Manage Jobs</p>
                                </NavLink>

                                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                                    <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                                    <p className='max-sm:hidden '>View Applications</p>
                                </NavLink>
                            </ul>
                        </div>

                        <div className='flex-1 h-full p-2 sm:p-5 overflow-x-hidden'>
                            <Outlet />
                        </div>
                    </div>

                </div>
            ) 
            : setShowRecruiterLogin(true)
        }
        <Footer/>
    </>
    );
};

export default DashBoard;