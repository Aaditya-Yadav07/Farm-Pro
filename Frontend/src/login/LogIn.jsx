import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LogIn() {
    const [userType, setUserType] = useState('farmer');
    const [identifier, setIdentifier] = useState(''); // Can be email or mobile
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { identifier, password, userType });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('userId', user._id);
                localStorage.setItem('userType', user.userType); // or 'buyer'

                if (user.userType === 'farmer') {   
                    navigate('/farmer-dashboard');
                } else if (user.userType === 'buyer') {
                    navigate('/corporate-dashboard');
                }
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed: An unexpected error occurred.');
            console.error('Login error:', error);
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen flex items-center justify-center pt-20 md:pt-24 bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 rounded-l-md ${userType === 'farmer' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setUserType('farmer')}
                        >
                            Farmer
                        </button>
                        <button
                            className={`px-4 py-2 rounded-r-md ${userType === 'buyer' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setUserType('buyer')}
                        >
                            Buyer
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-gray-700">Email or Mobile</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email or mobile"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
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
                        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
                            Log In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?
                        <Link to={`/signup?type=${userType}`} className="text-green-600 hover:underline">
                            Register as a {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LogIn;
