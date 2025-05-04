import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const navItems = (
      <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/disease">Crop Disease</Link></li>
        <li><Link to="/demand">Crop Demand</Link></li>
        <li><Link to="/weather">Weather Prediction</Link></li>
        <li><Link to="/cost">Price Prediction</Link></li>
      </>
    );


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
    <div className="min-h-screen font-sans bg-white">
      {/* Header */}
      <header className="bg-[#112B3C] text-white flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/farm-pro-logo.png" alt="Corp-Farm Logo" className="h-10" />
          <h1 className="text-2xl font-bold">Farm Pro</h1>
        </div>
        <div className="navbar-center">
          <ul className="menu text-xl text-white menu-horizontal px-1" role="navigation">
            {navItems}
          </ul>
        </div>
        <span className=" ml-4">💬</span>
        <button
          onClick={() => navigate('/farmerdashboard')}
          className="text-2xl bg-transparent hover:text-yellow-500 focus:outline-none"
          title="Go to Dashboard"
        >
          👤
        </button>

      
    </header>

      {/* Dashboard Content */ }
  <main className="p-6">
    <h2 className="text-3xl font-semibold text-center mb-6">Farmer Dashboard</h2>
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
          <p><span className="font-semibold px-2 py-1 rounded">Name</span>:{user?.name} </p>
          <p><span className="font-semibold px-2 py-1 rounded">Email</span>:{user?.email} </p>
          <p><span className="font-semibold px-2 py-1 rounded">Role</span>:{user?.userType || "Farmer"}</p>
          {/* <p><span className="font-semibold px-2 py-1 rounded">Status</span>: </p> */}
          <p><span className="font-semibold px-2 py-1 rounded">Aadhaar</span>:{user?.aadhaar} </p>
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

    <p className="text-red-600 mt-6 text-center font-semibold">❗ Note: Invalid and Unverified Farmers Cannot Add Land and Products</p>
  </main>
    </div >
  );
};

export default FarmerDashboard;


