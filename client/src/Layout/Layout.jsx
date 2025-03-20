import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({children}) => {
    return (
        <>
            <NavBar/>
                {children}
            <Footer/>
        </>
    );
};

export default Layout;