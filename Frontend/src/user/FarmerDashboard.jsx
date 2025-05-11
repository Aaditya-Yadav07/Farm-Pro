import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lognav from '../components/Lognav';
import axios from "axios";
import Footer from '../components/Footer';

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading your profile...</div>;
  }

  return (
    <div className="w-full flex font-sans bg-white">
      <div>
        <Lognav />
      </div>

      <main className="p-6 mt-36 w-full">
        <h2 className="text-4xl text-slate-600 font-bold text-center mb-6">Farmer Dashboard</h2>

        <div className="bg-orange-200 rounded-xl p-6 text-white grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Sidebar */}
          <div className="col-span-1 space-y-4">
            <Link to="/createproduct" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Create Product</Link>
            <Link to="/manageproduct" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Manage Products</Link>
            <Link to="/managecontracts" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Manage Contracts</Link>
            <Link to="/availablelands" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Available Lands for Lease</Link>
            <Link to="/disputeguidance" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Dispute Guidance</Link>
            <Link to="/educontent" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Educational Content</Link>
            <Link to="/policies" className="w-full block text-center bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">Government Policies</Link>
          </div>

          {/* Info Section */}
          <div className="col-span-1 text-black">
            <div className="bg-white p-4 rounded shadow space-y-2">
              <p><span className="font-semibold">Name:</span> {user?.name}</p>
              <p><span className="font-semibold">Email:</span> {user?.email}</p>
              <p><span className="font-semibold">Role:</span> {user?.userType || "Farmer"}</p>
              <p><span className="font-semibold">Aadhaar Number:</span> {user?.aadhaar}</p>
              <p><span className="font-semibold">Contact No.:</span> {user?.mobile}</p>
              <p><span className="font-semibold">Age:</span> 40</p>
              <p><span className="font-semibold">State:</span> Uttar Pradesh</p>
              <p><span className="font-semibold">Gender:</span> Male</p>
            </div>
          </div>

          {/* Profile & Sign Out */}
          <div className="col-span-1 flex flex-col items-center justify-center text-black">
            <div className="w-32 h-40 bg-white rounded overflow-hidden mb-4">
              <img
                src={`http://localhost:5000/${user.photo}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleSignOut}
              className="bg-[#112B3C] text-yellow-400 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>

        <p className="text-red-600 mt-6 mb-8 text-center font-semibold">
          ❗ Note: Invalid and Unverified Farmers Cannot Add Land and Products
        </p>

        <Footer />
      </main>
    </div>
  );
};

export default FarmerDashboard;
