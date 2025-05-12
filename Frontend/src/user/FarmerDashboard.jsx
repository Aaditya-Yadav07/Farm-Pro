import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lognav from '../components/Lognav';
import axios from "axios";
import Footer from '../components/Footer';

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when dashboard loads
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get id stored during login
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);



  const handleSignOut = () => {
    // Clear any stored authentication info (adjust if using cookies, tokens, etc.)
    localStorage.clear();

    // Redirect to homepage
    navigate('/');
  };

  if (!user) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading your profile...</div>; // Loading spinner
  }

  return (
    <div className=" w-full font-sans bg-white">

      {/* Navbar */}
      <div>
        <Lognav />
      </div>

      {/* Dashboard Content */}
      <main className="p-6 mt-36 mb-32 w-full">
        <h2 className="text-4xl text-slate-600 font-bold text-center mb-6">Farmer Dashboard</h2>
        <div className="bg-green-600 rounded-xl p-6 text-white grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Sidebar */}
          <div className="col-span-1 space-y-3">

            <Link
              to="/createproduct"
              className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Create Product
            </Link>
            <Link
              to="/manageproduct"
              className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Manage Products
            </Link>
            <Link
              to="/managecontracts"
              className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Manage Contracts
            </Link>
            <Link
              to="/availablelands"
              className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Available Lands for lease
            </Link>
            <Link
              to="/managecontracts"
              className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            >
              Manage Lands
            </Link>

          </div>

          {/* Info Sections */}
          <div className="col-span-2 grid grid-cols-2 gap-4 text-black">
            <div className="bg-white p-4 rounded shadow">
              <p><span className="font-semibold px-2 py-1 rounded">Name</span>: {user?.name} </p>
              <p><span className="font-semibold px-2 py-1 rounded">Email</span>: {user?.email} </p>
              <p><span className="font-semibold px-2 py-1 rounded">Role</span>: {user?.userType || "Farmer"}</p>
              {/* <p><span className="font-semibold px-2 py-1 rounded">Status</span>: </p> */}
              <p><span className="font-semibold px-2 py-1 rounded">Aadhaar Number : </span>{user?.aadhaar} </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p><span className="font-semibold  px-2 py-0.2 rounded">Contact No.</span>: {user?.mobile} </p>
              <p><span className="font-semibold  px-2 py-0.2 rounded">Age</span>: <span>40</span> </p>
              <p><span className="font-semibold  px-2 py-0.2 rounded">State</span>: <span>Uttar Pradesh</span></p>
              <p><span className="font-semibold  px-2 py-0.2 rounded">Gender</span>: <span>Male</span> </p>
            </div>
          </div>

          {/* Profile and Sign Out */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="w-32 h-40 bg-white rounded overflow-hidden mb-4">
              <img src={`http://localhost:5000/${user.photo}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={handleSignOut}
              className="bg-[#112B3C] text-yellow-400 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>

        <p className="text-red-600 mt-6 text-center font-semibold text-2xl">❗ Note: Invalid and Unverified Farmers Cannot Add Land and Products</p>
      </main>
      <Footer />
    </div >
  );
};

export default FarmerDashboard;


