import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageLand = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    area: '',
    soilType: '',
    price: '',
    ownerName: '',
    mobile: '',
    address: '',
    availableFrom: '',
    notes: '',
    image: null,
    pdf: null,
    status: 'Available', // Default status
  });

  useEffect(() => {
    // Fetch the lands from local storage (or replace with an API call to fetch from DB)
    const savedLands = JSON.parse(localStorage.getItem('landData')) || [];
    setLands(savedLands);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else if (name === 'pdf') {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (landId) => {
    const landToEdit = lands.find((land) => land.id === landId);
    setSelectedLand(landToEdit);
    setFormData(landToEdit); // Fill the form with the current land data
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedLands = lands.map((land) =>
      land.id === selectedLand.id ? { ...land, ...formData } : land
    );
    localStorage.setItem('landData', JSON.stringify(updatedLands));
    alert('Land updated successfully!');
    setEditMode(false);
    setSelectedLand(null);
    setFormData({
      title: '',
      location: '',
      area: '',
      soilType: '',
      price: '',
      ownerName: '',
      mobile: '',
      address: '',
      availableFrom: '',
      notes: '',
      image: null,
      pdf: null,
      status: 'Available',
    });
    setLands(updatedLands); // Update the list of lands
  };

  const handleStatusChange = (landId, status) => {
    const updatedLands = lands.map((land) =>
      land.id === landId ? { ...land, status } : land
    );
    localStorage.setItem('landData', JSON.stringify(updatedLands));
    setLands(updatedLands);
  };

  const handleDelete = (landId) => {
    const updatedLands = lands.filter((land) => land.id !== landId);
    localStorage.setItem('landData', JSON.stringify(updatedLands));
    setLands(updatedLands);
    alert('Land deleted successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
  <div className="fixed top-0 left-0 right-0 bg-[#0d2c45] flex justify-between items-center px-10 py-5 z-50">
  <h1 className="text-white text-3xl font-semibold">Manage Land</h1>
  <button
    onClick={() => navigate('/corporatedashboard')}
    className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500"
  >
    👤 Dashboard
  </button>
</div>


      {/* Land List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lands.map((land) => (
          <div
            key={land.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={land.imageUrl}
              alt="Land"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{land.title}</h2>
            <p className="text-gray-600">{land.ownerName}</p>
            <p className="text-gray-600">{land.address}</p>
            <p className="text-gray-600">Status: {land.status}</p>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleEdit(land.id)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(land.id)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleStatusChange(land.id, 'Leased')}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Lease
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Land Edit Form (only shows if Edit mode is true) */}
      {editMode && selectedLand && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Edit Land - {selectedLand.title}</h2>
          <form onSubmit={handleUpdate}>
            <input
              name="title"
              placeholder="Land Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="area"
              placeholder="Area (in acres)"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="soilType"
              placeholder="Soil Type"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price per month (₹)"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              name="address"
              placeholder="Owner Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              name="availableFrom"
              type="date"
              value={formData.availableFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Update Land Details
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageLand;
