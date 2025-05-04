import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';  // Import Link for navigation

function Jalna() {
  const [activeTab, setActiveTab] = useState('landDetails');

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Jalna Land Details', 20, 20);
    doc.text('Location: Jalna, Maharashtra', 20, 30);
    doc.text('Total Area: 10 Acres', 20, 40);
    doc.text('Crop Suitability: Sugarcane', 20, 50);
    doc.text('Soil Type: Black Cotton Soil', 20, 60);
    doc.text('Water Availability: Medium', 20, 70);
    doc.save('Jalna_Land_Details.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      {/* Back Button - Top Left */}
              <Link 
                to="/" 
                className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
              >
                ← Back to Home
              </Link>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex">
        {/* Left Side - Image */}
        <div className="w-1/2 p-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAq3rWFDxGLGpXbhIXsXDZK1vNHWnOVKB6YA&s" 
            alt="Jalna Land" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        {/* Right Side - Land Details */}
        <div className="w-1/2 p-4">
          {/* PDF Button */}
          <div className="flex justify-end">
            <button 
              onClick={generatePDF} 
              className="text-blue-600 hover:underline text-sm"
            >
              Land Record PDF
            </button>
            
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">Jalna Land</h2>
          <p className="text-lg text-gray-600">₹ 30,000 (24%)</p>
          <p className="text-gray-500">📅 Duration: 40 months</p>
          
          <p className="mt-2 text-gray-700 font-semibold">Land Description</p>
          <p className="text-gray-600">Land in Jalna suitable for sugarcane farming.</p>
          <Link 
                  to="/login" 
                  className="absolute top-6 right-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  Contact Us
                </Link>
          
          {/* Tab Buttons */}
          <div className="flex mt-4">
            <button 
              className={`px-4 py-2 ${activeTab === 'landDetails' ? 'bg-blue-900 text-yellow-500' : 'bg-gray-200 text-gray-700'}`} 
              onClick={() => setActiveTab('landDetails')}
            >
              Land Details
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'landRecords' ? 'bg-blue-900 text-yellow-500' : 'bg-gray-200 text-gray-700'}`} 
              onClick={() => setActiveTab('landRecords')}
            >
              Land Records Details
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'farmerDetails' ? 'bg-blue-900 text-yellow-500' : 'bg-gray-200 text-gray-700'}`} 
              onClick={() => setActiveTab('farmerDetails')}
            >
              Farmer Details
            </button>
          </div>
          
          {/* Dynamic Content Based on Active Tab */}
          <div className="mt-4">
            {activeTab === 'landDetails' && (
              <ul className="space-y-2">
                <li><strong>Land Size (in acres):</strong> 10</li>
                <li><strong>State:</strong> Maharashtra</li>
                <li><strong>Address 📍:</strong> Jalna</li>
                
              </ul>
            )}
            {activeTab === 'landRecords' && (
              <p className="text-gray-600">Land Records for this plot are fully verified and registered under the Government of Maharashtra.</p>
            )}
            {activeTab === 'farmerDetails' && (
              <p className="text-gray-600">Farmer Name: Suresh Patil<br/>Experience: 15+ years<br/>Specialization: Sugarcane Farming</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jalna;

