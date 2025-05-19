import React, { useState } from 'react';
import axios from 'axios';

function MakeContractPage() {
  const [formData, setFormData] = useState({
    buyerName: '',
    farmerName: '',
    cropType: '',
    quantity: '',
    priceRange: '',
    advancePayment: '',
    terms: '',
    startDate: '',
    endDate: '',
  });

  const [permissionPDF, setPermissionPDF] = useState(null);
  const [eSignature, setESignature] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'permissionPDF') {
      setPermissionPDF(files[0]);
    } else if (name === 'eSignature') {
      setESignature(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (permissionPDF) data.append('permissionPDF', permissionPDF);
    if (eSignature) data.append('eSignature', eSignature);

    try {
      const res = await axios.post('http://localhost:5000/api/contracts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Contract submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create Contract</h2>
      {message && <div className="mb-4 text-center text-blue-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Buyer Name', name: 'buyerName' },
          { label: 'Farmer Name', name: 'farmerName' },
          { label: 'Crop Type', name: 'cropType' },
          { label: 'Quantity (in Kg/Quintals)', name: 'quantity' },
          { label: 'Price Range (e.g., ₹1000 - ₹1200)', name: 'priceRange' },
          { label: 'Advance Payment (if any)', name: 'advancePayment' },
          { label: 'Terms and Conditions', name: 'terms' },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700">Permission PDF</label>
          <input
            type="file"
            name="permissionPDF"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">E-Signature (Image)</label>
          <input
            type="file"
            name="eSignature"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Contract
        </button>
      </form>
    </div>
  );
}

export default MakeContractPage;
