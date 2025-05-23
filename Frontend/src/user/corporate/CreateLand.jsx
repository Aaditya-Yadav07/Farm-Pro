import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateLand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    soilType: '',
    price: '',
    ownerName: '',
    mobile: '',
    owneraddress: '',
    availableFrom: '',
    notes: '',
    image: null,
    pdf: null,
    imageFile: null, // for file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]), imageFile: files[0] });
    } else if (name === 'pdf') {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('location', formData.location);
    form.append('area', formData.area);
    form.append('soilType', formData.soilType);
    form.append('price', formData.price);
    form.append('ownerName', formData.ownerName);
    form.append('mobile', formData.mobile);
    form.append('owneraddress', formData.owneraddress);
    form.append('availableFrom', formData.availableFrom);
    form.append('notes', formData.notes);
    form.append('image', formData.imageFile); // real file, not preview URL
    form.append('pdf', formData.pdf);
    form.append('userId', localStorage.getItem('userId')); // Replace with real user ID logic
    form.append('status', 'Available');

    try {
      const res = await fetch('http://localhost:5000/api/lands', {
        method: 'POST',
        body: form,
      });

      if (res.ok) {
        alert('Land submitted successfully!');
        setFormData({
          title: '',
          location: '',
          area: '',
          soilType: '',
          price: '',
          ownerName: '',
          mobile: '',
          owneraddress: '',
          availableFrom: '',
          notes: '',
          image: null,
          imageFile: null,
          pdf: null,
        });
      } else {
        const error = await res.json();
        alert('Submission failed: ' + error.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6 flex flex-col items-center">
      <div className="fixed top-0 left-0 right-0 bg-[#0d2c45] flex justify-between items-center px-10 py-5 z-50">
        <h1 className="text-white text-3xl font-semibold">Create Land for lease</h1>
        <button
          onClick={() => navigate('/corporatedashboard')}
          className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500"
        >
          👤 Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full lg:w-1/2 space-y-4">
          <input name="title" placeholder="Land Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="area" placeholder="Area (in acres)" value={formData.area} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="soilType" placeholder="Soil Type" value={formData.soilType} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="price" placeholder="Price per year (₹)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded" required />

          <input name="owneraddress" placeholder="Owner Address" value={formData.owneraddress} onChange={handleChange} className="w-full p-2 border rounded" />

          <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="notes" placeholder="Additional Notes (if any)" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded" />

          <label className="block text-sm font-medium text-gray-700">Upload Land Image (JPG/PNG)</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border rounded p-2" required />
          <label className="block text-sm font-medium text-gray-700 mt-4">Upload Land Registration Proof (PDF)</label>
          <input type="file" name="pdf" accept=".pdf" onChange={handleChange} className="w-full border rounded p-2" required />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Submit Land for Lease</button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow-md w-full lg:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
          {formData.image && <img src={formData.image} alt="Land" className="w-full h-48 object-cover rounded mb-4" />}
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Area:</strong> {formData.area} acres</p>
          <p><strong>Soil Type:</strong> {formData.soilType}</p>
          <p><strong>Price:</strong> ₹{formData.price}/year</p>
          <p><strong>Owner:</strong> {formData.ownerName}</p>
          <p><strong>Mobile:</strong> {formData.mobile}</p>
          <p><strong>Address:</strong> {formData.owneraddress}</p>
          <p><strong>Available From:</strong> {formData.availableFrom}</p>
          <p><strong>Notes:</strong> {formData.notes}</p>
          {formData.pdf && <p><strong>PDF:</strong> {formData.pdf.name}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateLand;
