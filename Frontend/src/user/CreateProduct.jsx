import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    cropType: '',
    farmerName: '',
    mobile: '',
    address: '',
    experience: '',
    quantity: '',
    unit: 'kg',
    expectedPriceRange: '',
    landPhoto: null,
    landSize: '',
    description: '',
    notes: '',
    expertise: '',  
    otherExpertise: '',
    harvestMonth: '',
    deliveryMonth: '',
    available: true,
    ownershipDocument: null,
    farmerId: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setFormData((prev) => ({
        ...prev,
        farmerId: user._id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Append fields only if they have values
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => data.append(key, v));
          } else {
            data.append(key, value);
          }
        }
      });

      // Log the FormData to ensure it's populated correctly
      console.log([...data.entries()]);

      // Make the API call
      await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Product created successfully!');
      setFormData((prev) => ({
        cropName: '',
        cropType: '',
        farmerName: '',
        mobile: '',
        address: '',
        experience: '',
        quantity: '',
        unit: 'kg',
        expectedPriceRange: '',
        landPhoto: null,
        landSize: '',
        description: '',
        notes: '',
        expertise: '',  
        otherExpertise: '',
        harvestMonth: '',
        deliveryMonth: '',
        available: true,
        ownershipDocument: null,
        farmerId: prev.farmerId,
      }));
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('❌ Error creating product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-[#0d2c45] flex justify-between fixed top-0 left-0 right-0 z-50 items-center mb-8 p-4 rounded">
        <h1 className="text-2xl text-white font-bold">Create Product</h1>
        <Link to="/farmerdashboard">
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500">
            👤 Dashboard
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white mt-20 p-6 rounded shadow-md max-w-xl mx-auto" encType="multipart/form-data">
        {/* Crop Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Crop Name</label>
          <input type="text" name="cropName" value={formData.cropName} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        {/* Crop Type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Crop Type</label>
          <input type="text" name="cropType" value={formData.cropType} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        {/* Basic Details */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Farmer Name</label>
          <input type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Mobile No</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Experience (in years)</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="e.g., 100" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Unit</label>
            <select name="unit" value={formData.unit} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="kg">kg</option>
              <option value="quintal">quintal</option>
              <option value="ton">ton</option>
            </select>
          </div>
        </div>

        {/* Ranges */}
        <div>
          <label className="block font-medium mb-1">Expected Price Range (₹)</label>
          <input type="text" name="expectedPriceRange" value={formData.expectedPriceRange} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="e.g., ₹20-25/kg" />
        </div>

        {/* Expertise in Crops */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Expertise in Crops</label>
          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Enter expertise in crops (comma separated)"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Additional Info */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Photo of Land</label>
          <input type="file" name="landPhoto" accept="image/*" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Size of Land (in acres)</label>
          <input type="text" name="landSize" value={formData.landSize} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Months */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Harvest Month</label>
            <input type="text" name="harvestMonth" value={formData.harvestMonth} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block font-medium mb-1">Delivery Month</label>
            <input type="text" name="deliveryMonth" value={formData.deliveryMonth} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Document of Ownership (PDF)</label>
          <input type="file" name="ownershipDocument" accept="application/pdf" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Create Product
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
