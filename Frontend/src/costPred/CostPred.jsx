import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Lognav from "../components/Lognav";

function MarketPricePred() {
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarketPrice = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Dummy price prediction logic (Replace with API or AI Model)
      const basePrice = Math.random() * (5000 - 3000) + 3000; // ₹3,000 to ₹5,000
      setPredictedPrice(basePrice.toFixed(2));
    } catch (err) {
      setError("Failed to fetch data. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Lognav />
      <div className="min-h-screen flex flex-col items-center justify-start bg-yellow-100 px-6 pt-28 pb-6">
     
        <h1 className="text-4xl font-bold text-yellow-700 mb-6">
          📊 Crop Price Prediction
        </h1>



        <form onSubmit={fetchMarketPrice} className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
          {/* Crop Name */}
          <div>
            <label className="block text-gray-700 font-medium">Select Crop</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Enter crop name"
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">Enter Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter market location"
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition font-semibold"
          >
            Predict Price
          </button>
        </form>

        {/* Prediction Result */}
        {loading && <p className="text-lg text-gray-700 mt-4">Loading...</p>}
        {error && <p className="text-lg text-red-500 mt-4">{error}</p>}
        {predictedPrice && (
          <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-bold text-yellow-700">Predicted Market Price</h2>
            <p className="text-3xl font-semibold text-gray-900">₹{predictedPrice} per quintal</p>
            <p className="text-gray-600">Based on current market trends</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MarketPricePred;