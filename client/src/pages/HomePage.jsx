import React from 'react';
import Hero from '../components/home/Hero';
import JobList from '../components/home/JobList';
import AppDownload from '../components/home/AppDownload';
import Layout from '../Layout/Layout';

const HomePage = () => {
    return (
        <Layout>
            <Hero/>
            <JobList/>
            <AppDownload/>
        </Layout>
    );
};

export default HomePage;