import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AvailableLands = () => {
  const navigate = useNavigate();

  const [lands, setLands] = useState([]);

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/lands'); // Update to your backend API URL
      const data = await response.json();
      console.log("Fetched lands data:", data);
      setLands(data);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h1 className="text-2xl font-semibold">Available Lands for Lease</h1>
        <Link to="/farmerdashboard">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            <span role="img" aria-label="dashboard">👤</span> Dashboard
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 ">
        {lands.map((land, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
  src={land.image ? `http://localhost:5000/${land.image}` : 'https://via.placeholder.com/400x200.png?text=No+Image'}
  alt={land.cropName}
  className="w-full h-48 object-cover"
/>

            <div className="p-4">
              
              <p><strong>Owner Name:</strong> {land.ownerName}</p>
              <p><strong>Address:</strong> {land.address}</p>
              <p><strong>Mobile:</strong> {land.mobile}</p>
              <p><strong>Price:</strong> ₹{land.price}/year</p>
              <p className="text-green-600 font-semibold"><strong>Status:</strong> {land.status}</p>
              
              <button  onClick={() => navigate('/land-detail', { state: { land } })} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableLands;
