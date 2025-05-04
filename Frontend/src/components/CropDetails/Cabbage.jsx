import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

function Cabbage() {
  const [activeTab, setActiveTab] = useState('productDetails');

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
     {/* Back Button - Top Left */}
     <Link 
                  to="/" 
                  className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  ← Back to Home
                </Link>
                

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex relative">
         
        {/* Left Side - Image */}
        <div className="w-1/2 p-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvDOpjdVA6COQQaacaO-FfGbVmOa3bjX_da3nCmrsPEj1LBc8zEiPDC5WT0d-FCvMl9I&usqp=CAU" 
            alt="Cabbage" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        {/* Right Side - Product Details */}
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold text-gray-800">Cabbage</h2>
          <p className="text-lg text-gray-600">₹ 50 (Per Kg.)</p>
          <p className="text-gray-500">🥬 Cabbages - Cabbage Raw</p>
          
          <p className="mt-2 text-gray-700 font-semibold">Product Description</p>
          <p className="text-gray-600">Fresh green cabbage available at an affordable price.</p>
          
          {/* Tab Buttons */}
          <div className="flex mt-4 border-b">
            <button 
              className={`px-4 py-2 ${activeTab === 'productDetails' ? 'bg-yellow-500 text-black' : 'bg-blue-900 text-white'}`} 
              onClick={() => setActiveTab('productDetails')}
            >
              Product Details
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'landDetails' ? 'bg-yellow-500 text-black' : 'bg-blue-900 text-white'}`} 
              onClick={() => setActiveTab('landDetails')}
            >
              Land Details
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'farmerDetails' ? 'bg-yellow-500 text-black' : 'bg-blue-900 text-white'}`} 
              onClick={() => setActiveTab('farmerDetails')}
            >
              Farmer Details
            </button>
          </div>
          
          {/* Dynamic Content Based on Active Tab */}
          <div className="mt-4">
            {activeTab === 'productDetails' && (
              <ul className="space-y-2">
                <li><strong>Order Capacity:</strong> 56 - 60 Kg</li>
                <li><strong>Harvest Month:</strong> March 2022</li>
                <li><strong>Delivery Month:</strong> June 2022</li>
                <li><strong>Payment before Harvest:</strong> ₹ 42,000</li>
                <Link 
                  to="/login" 
                  className="absolute top-6 right-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  Buy Now
                </Link>
              </ul>
            )}
            {activeTab === 'landDetails' && (
              <p className="text-gray-600">Land used for cabbage cultivation is organic-certified and well-irrigated.</p>
            )}
            {activeTab === 'farmerDetails' && (
              <p className="text-gray-600">Farmer: Rajesh Kumar<br/>Experience: 12+ years<br/>Specialization: Organic vegetable farming</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cabbage;
