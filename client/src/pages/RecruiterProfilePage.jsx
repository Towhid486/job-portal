import React, { useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RecruiterProfile from '../components/Profile/RecruiterProfile';

const RecruiterProfilePage = () => {
    const { setShowRecruiterLogin } = useContext(AppContext)
    const companyToken = localStorage.getItem('recruiter_token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!companyToken) {
            toast.error("Login Required!");
            navigate('/');
        }
    }, [companyToken]);
    return (
        <Layout>
            {
                    companyToken? (
                    <RecruiterProfile/>
                )
                : setShowRecruiterLogin(true)
            }
        </Layout>
    );
};
export default RecruiterProfilePage;