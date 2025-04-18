import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const NavBar = () => {

    const {backendURL, setShowRecruiterLogin,companyToken, setCompanyToken, companyData, setShowUserLogin, userToken, setUserToken, userData } = useContext(AppContext)
    const navigate = useNavigate()
    const [showOption, setShowOption] = useState(false)

    const logout = async () => {
        // Remove from cookies 
        await axios.post(`${backendURL}/logout`,{}, {withCredentials: true})
        await axios.post(`${backendURL}/recruiter-logout`,{}, {withCredentials: true})
        localStorage.removeItem('user_token')
        localStorage.removeItem('recruiter_token')
        setUserToken(null) 
        setCompanyToken(null)
        navigate('/')
    }
    return (
        <div className='shadow py-4'>
            <div className='container px-4 max-sm:px-2 2xl:px-20 mx-auto flex justify-between items-center'>
                <Link to='/'>
                    <img className='cursor-pointer max-w-40 max-sm:w-36' src={assets.logo}/>
                </Link>
                {
                        userToken? 
                            <div className='flex item-center gap-3'>
                                <Link to={'/'}>Find Jobs</Link>
                                <Link className='max-sm:hidden' to={'/applications'}>Applied</Link>
                                <p>|</p>
                                <p className='max-sm:hidden'>Hi, {userData?.name}</p>
                                {/* <img className='w-8 border border-gray-200 rounded-full' src={userData?.image} alt="" /> */}
                                <div className='relative'>
                                    {!userData?.image ? (
                                        <img onClick={ (e) => setShowOption(prev => !prev)}  className='w-8 border border-gray-200 rounded-full cursor-pointer' src={assets.person_icon} alt="" />
                                    )
                                    : (
                                        <img onClick={ (e) => setShowOption(prev => !prev)}  className='w-8 border border-gray-200 rounded-full cursor-pointer' src={userData?.image} alt="" />

                                    )
                                    }
                                    <div className={`${showOption?"":"hidden"} absolute top-0 right-0 text-black rounded mt-12`}>
                                        <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm'>
                                            <li><Link className='block sm:hidden py-1 px-2 cursor-pointer pr-10 rounded-md border border-gray-200' to={'/applications'}>Applied</Link></li>
                                            <li onClick={(e)=>logout()} className='py-1 px-2 cursor-pointer pr-10 bg-black text-white rounded-md border border-gray-200 mt-2'>Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    :   
                        companyToken? 
                            <div className='flex item-center gap-3'>
                                <Link to={'/dashboard'}>Dashboard</Link>
                                <p>|</p>
                                <p className='max-sm:hidden'>Hi, {companyData?.name}</p>
                                <div className='relative'>
                                    <img onClick={ (e) => setShowOption(prev => !prev)} className='w-8 border border-gray-200 rounded-full cursor-pointer' src={companyData?.image} alt="" />
                                    <div className={`${showOption?"":"hidden"} absolute top-0 right-0 z-10 text-black rounded mt-12`}>
                                        <ul className='list-none m-0 p-2 bg-light rounded-md border border-gray-200 text-sm'>
                                            <li onClick={(e)=>logout()} className='py-1 px-2 bg-black text-white cursor-pointer pr-10'>Logout</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>    
                        :   
                            <div className='flex gap-4 max-sm:gap-1 max-sm:text-[14px] max-sm:font-semibold'>
                                <Link to={'/'} className='pt-2 max-sm:hidden'>Find Jobs</Link>
                                <button onClick={(e)=> setShowRecruiterLogin(true)} className='text-gray-600 bg-blue-600 hover:bg-blue-700 text-white px-5 max-sm:px-3 py-2 rounded-full'>Recruiter Login</button>
                                <button onClick={(e)=> setShowUserLogin(true)} className='bg-black hover:bg-gray-600 text-white px-6 max-sm:px-4 py-2 rounded-full'>Sign In</button>
                            </div>
                }
                
            </div>
        </div>
    );
};

export default NavBar;