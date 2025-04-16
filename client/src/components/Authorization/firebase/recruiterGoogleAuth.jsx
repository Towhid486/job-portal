import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth, provider } from '../../../firebase';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from './../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets';

const RecruiterGoogleAuth = () => {

    const {backendURL,setCompanyToken, setCompanyData, setShowRecruiterLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            const user = response.user
            
            const name = user.displayName
            const email = user.email
            const image = user.photoURL

            console.log(name,email,image)
            const {data} = await axios.post(`${backendURL}/recruiter-google-login`,
                {name,email,image},
                { withCredentials: true }
            )
            console.log(data)
            if(data.status===true){
                toast.success("Google Authorization Success!")
                setCompanyToken(data.token)
                setCompanyData(data?.data)
                localStorage.setItem('recruiter_token',data.token)
                setShowRecruiterLogin(false)
                navigate('/dashboard')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='text-center'>
          <button onClick={googleLogin} className="bg-black py-2 px-10 flex justify-between text-white mt-4">
            <img className='max-w-8 pr-2' src={assets.google} alt="" />
            Sign In With Google
          </button>
        </div>
    );
};

export default RecruiterGoogleAuth;