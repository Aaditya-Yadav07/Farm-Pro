import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Lognav from "../components/Lognav";
import axios from "axios";


const CorporateDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleManageContracts = () => {
    console.log("Redirecting to Manage Contracts...");
    // TODO: Implement navigation logic
    navigate('/managecontract')
  };

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
    console.log("Signing out...");
    // TODO: Implement sign-out logic

    // Clear any stored authentication info (adjust if using cookies, tokens, etc.)
    localStorage.clear();

    // Redirect to homepage
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white mt-24">
      <Lognav />

      {/* Title */}
      <h1 className="text-center text-3xl pt-24 font-semibold mt-10">Corporate Dashboard</h1>

      {/* Dashboard */}
      <div className="bg-orange-200 rounded-xl mt-10 p-10 w-4/5 mx-auto flex gap-6">
        {/* Button Section */}
        <div className="w-1/3 flex flex-col gap-4">
          <Link to="/availablecrops">
            <button className="w-full bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100">
              Available Crops for Contract
            </button>
          </Link>

          <button
            onClick={handleManageContracts}
            className="w-full bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
          >
            Manage Contracts
          </button>
          <button
            className="w-full bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => navigate('/createland')}
          >
            Create Land
          </button>
          <button
            className="w-full bg-white text-green-700 py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => navigate('/manageland')}
          >
            Manage Land
          </button>
          {/* Add more buttons here if needed – spacing will remain consistent */}
        </div>


        {/* Info Section */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <span className="bg-[#6fb221] text-white px-2 py-1 rounded mr-2">Name : </span>{user?.name}
            </div>
            <div>
              <span className="bg-[#6fb221] text-white px-2 py-1 rounded mr-2">Email : </span>{user?.email}
              <span></span>
            </div>
            <div>
              <span className="bg-[#6fb221] text-white px-2 py-1 rounded mr-2">Role : </span>{user?.userType}
              <span>Corporate</span>
            </div>
            <div>
              <span className="bg-[#6fb221] text-white px-2 py-1 rounded mr-2">Status : </span> Available 
            </div>
          </div>
          <div className="text-right mt-6">
            <button
              onClick={handleSignOut}
              className="bg-[#0d2c45] text-yellow-400 px-5 py-2 rounded shadow"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;