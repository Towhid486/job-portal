import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';

const RecruiterProfile = () => {
    const { backendURL, companyData, fetchCompanyData } = useContext(AppContext);
    const companyToken = localStorage.getItem('recruiter_token');

    const [selectedFile, setSelectedFile] = useState(null);

    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("location", location);
        if (photo) {
            formData.append("image", photo); // 'image' should match backend field
        }

        try {
            const {data} = await axios.post(`${backendURL}/update-recruiter-profile`, formData, {headers: {token: companyToken}});

            if (data.status) {
                toast.success("Profile updated successfully");
                fetchCompanyData(); // refresh UI with new data
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        }
    };

    useEffect(() => {
        if (companyData && name === '' && phone === '' && location === '') {
            setPhoto(companyData.image);
            setName(companyData.name);
            setPhone(companyData.phone);
            setLocation(companyData.location);
        }
    }, [companyData]);

    if (!companyData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full min-h-screen bg-gray-100 py-10 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Recruiter Profile</h2>

                {/* Profile Photo */}
                <div className="flex flex-col items-center justify-center text-center">
                    {
                        selectedFile? 
                        <img
                            className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                            src={selectedFile}
                            alt="Profile"
                        />
                        : 
                        <img
                            className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                            src={photo}
                            alt="Profile"
                        />
                    }

                    
                    <label htmlFor="resumeUpload" className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600 cursor-pointer">
                        <input
                            id="resumeUpload"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setSelectedFile(URL.createObjectURL(file));
                                    setPhoto(file); // For API upload
                                }
                            }}
                            accept="image/*"
                            type="file"
                            hidden
                        />
                        <span>Change Photo</span>
                        <img src={assets.profile_upload_icon} alt="" className="w-6 h-6" />
                    </label>
                </div>


                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecruiterProfile;