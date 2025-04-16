import { signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth, provider } from '../../../firebase';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from './../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets';

const GoogleAuth = () => {

    const {backendURL,setUserToken, setUserData, setShowUserLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            const user = response.user
            // const userData = {
            //     name: user.displayName,
            //     email: user.email,
            //     image: user.photoURL
            // }
            const name = user.displayName
            const email = user.email
            const image = user.photoURL

            console.log(name,email,image)
            const {data} = await axios.post(`${backendURL}/google-login`,
                {name,email,image},
                { withCredentials: true }
            )
            console.log(data)
            if(data.status===true){
                toast.success("Google Authorization Success!")
                setUserData(data?.data)
                setUserToken(data.token)
                localStorage.setItem('user_token',data.token)
                setShowUserLogin(false)
                navigate('/applications')
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

export default GoogleAuth;