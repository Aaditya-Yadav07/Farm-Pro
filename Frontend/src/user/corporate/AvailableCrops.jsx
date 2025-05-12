import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AvailableCrops = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const available = res.data.filter(crop => crop.available);
        setCrops(available);
      } catch (err) {
        console.error('Error fetching crops:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  if (loading) return <div className="text-center py-6">Loading crops...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 px-6 flex flex-col items-center">
      {!selectedCrop ? (
        <>
          {/* Header */}
          <div className="fixed top-0 left-0 right-0 bg-[#0d2c45] flex justify-between items-center px-10 py-5 z-50">
  <h1 className="text-white text-3xl font-semibold">Available Crops for Contract</h1>
  <Link to="/corporatedashboard">
  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
  >
    <span role="img" aria-label="dashboard">👤</span> Dashboard
  </button>
</Link>
</div>

          {/* Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow border p-4 hover:shadow-md transition"
              >
                {crop.landPhoto && (
                  <img
                    src={`http://localhost:5000/${crop.landPhoto}`}
                    alt={crop.cropName}
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                )}

                <h2 className="text-lg font-bold text-gray-800">
                  {crop.cropName} <span className="text-sm text-gray-500">({crop.cropType})</span>
                </h2>
                <p className="text-gray-700"><strong>Price:</strong> ₹{crop.expectedPriceRange}</p>
                <p className="text-gray-700"><strong>Address:</strong> {crop.address}</p>
                <p className="text-green-600 font-semibold">Status: Available</p>
                <p className="text-gray-700"><strong>Farmer:</strong> {crop.farmerName}</p>
                <p className="text-gray-700"><strong>Mobile:</strong> {crop.mobile}</p>
                <p className="text-gray-700"><strong>Description:</strong> {crop.description}</p>

                <button
                  onClick={() => setSelectedCrop(crop)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Detail View
        <div className="w-full min-h-screen bg-gray-100 px-4">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-4">
          <button
            onClick={() => setSelectedCrop(null)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            ← Back to Crops
          </button>
        </div>
      
        {/* Detail Container */}
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
            
            {/* Land Photo */}
            <img
              src={selectedCrop.landPhoto ? `http://localhost:5000/${selectedCrop.landPhoto}` : '/path/to/default.jpg'}
              alt={selectedCrop.cropName}
              className="w-full md:w-[45%] h-[400px] rounded-xl object-cover"
            />
      
            {/* Details */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-3 capitalize">{selectedCrop.cropName}</h2>
              <p className="text-lg text-gray-700 mb-6"><strong>Type:</strong> {selectedCrop.cropType}</p>
      
              <div className="space-y-2 text-gray-700 text-base">
                <p><strong>Farmer Name:</strong> {selectedCrop.farmerName}</p>
                <p><strong>Mobile:</strong> {selectedCrop.mobile}</p>
                <p><strong>Experience:</strong> {selectedCrop.experience} years</p>
                <p><strong>Address:</strong> {selectedCrop.address}</p>
                <p><strong>Description:</strong> {selectedCrop.description}</p>
                <p><strong>Quantity:</strong> {selectedCrop.quantity} {selectedCrop.unit}</p>
                <p><strong>Price Range:</strong> ₹{selectedCrop.expectedPriceRange}</p>
                <p><strong>Harvest Month:</strong> {selectedCrop.harvestMonth}</p>
                <p><strong>Delivery Month:</strong> {selectedCrop.deliveryMonth}</p>
                <p><strong>Land Size:</strong> {selectedCrop.landSize}</p>
                <p><strong>Expertise:</strong> {selectedCrop.expertise}</p>
                {selectedCrop.notes && <p><strong>Notes:</strong> {selectedCrop.notes}</p>}
                {selectedCrop.otherExpertise && <p><strong>Other Expertise:</strong> {selectedCrop.otherExpertise}</p>}
              </div>
      
              {/* Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/make-contract">
                  <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                    Make Contract
                  </button>
                </Link>
      
                {selectedCrop.ownershipDocument && (
                  <a
                    href={`http://localhost:5000/${selectedCrop.ownershipDocument}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900"
                  >
                    Download Ownership PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      )}
    </div >
  );
};

export default AvailableCrops;


