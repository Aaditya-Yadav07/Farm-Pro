import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function SignUp() {
    const location = useLocation();
    const userType = new URLSearchParams(location.search).get('type') || 'farmer';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [cin, setCin] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('password', password);
        formData.append('aadhaar', aadhaar);
        formData.append('userType', userType);
        formData.append('photo', photo);
        if (userType === 'buyer') formData.append('cin', cin);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.status === 201) {
                alert('Registration successful!');
                window.location.href = '/login';
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center pt-20 md:pt-24 bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div>
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Mobile Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Aadhaar Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your Aadhaar number"
                                value={aadhaar}
                                onChange={(e) => setAadhaar(e.target.value)}
                                required
                            />
                        </div>
                        {userType === 'buyer' && (
                            <div>
                                <label className="block text-gray-700">CIN (Corporate ID)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your CIN"
                                    value={cin}
                                    onChange={(e) => setCin(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700">Upload Photo</label>
                            <input
                                type="file"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={handlePhotoChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : `Sign Up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-green-600 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
