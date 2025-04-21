import React, { useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { AppContext } from '../context/AppContext';
import UserProfile from '../components/Profile/UserProfile';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
    const { setShowUserLogin } = useContext(AppContext)
    const userToken = localStorage.getItem('user_token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!userToken) {
            toast.error("Login Required!");
            navigate('/');
        }
    }, [userToken]);
    return (
        <Layout>
            {
                userToken? (
                    <UserProfile/>
                )
                : setShowUserLogin(true)
            }
        </Layout>
    );
};

export default UserProfilePage;