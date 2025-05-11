import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ManageLand = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '', location: '', area: '', soilType: '', price: '', ownerName: '',
    mobile: '', address: '', availableFrom: '', notes: '', image: null, pdf: null
  });
  const [newFiles, setNewFiles] = useState({ pdf: null, image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLands = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/lands');
      setLands(res.data);
    } catch (err) {
      setError("Failed to fetch lands.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/lands/${id}`);
      fetchLands();
    } catch {
      setError("Failed to delete land.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/lands/${id}`, { available: !currentAvailability });
      fetchLands();
    } catch {
      setError("Failed to update availability.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    const land = lands[index];
    setEditFormData({
      ...land,
      availableFrom: land.availableFrom ? land.availableFrom.slice(0, 10) : '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewFiles({ ...newFiles, [name]: files[0] });
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    Object.entries(editFormData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    if (newFiles.pdf) formData.append("pdf", newFiles.pdf);
    if (newFiles.image) formData.append("image", newFiles.image);

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/lands/${editFormData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingIndex(null);
      fetchLands();
    } catch (err) {
      setError("Failed to save land changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header and Navigation */}
      {/* <div className="relative ">
        <div className="absolute top-4 right-4 z-50 ">
          <button onClick={() => navigate('/farmerdashboard')} className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500">👤 Dashboard</button>
        </div>
      </div> */}

      <h1 className="bg-[#0d2c45] text-white text-3xl font-semibold text-left mb-10  fixed top-0 left-0 right-0 z-50 p-4">Manage Lands </h1>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <div className="overflow-x-auto  my-16">
        <table className="min-w-full border border-gray-300 bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Owner Name</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Registration Proof</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{land.ownerName}</td>
                <td className="px-3 py-2">{land.location}</td>
                <td className="px-3 py-2">{land.price}</td>
                <td className="px-3 py-2">
                  {land.pdf ? (
                    <a href={`http://localhost:5000/${land.pdf}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>
                  ) : "No Document"}
                </td>
                <td className="px-3 py-2">
                  <span className={land.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {land.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => handleToggleAvailability(land._id, land.available)} className="text-blue-600 hover:underline">{land.available ? "Unmark" : "Mark"}</button>
                  <button onClick={() => handleEditClick(index)} className="text-yellow-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(land._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[768px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Land</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <input name="title" value={editFormData.title || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Land Title" />
              <input name="location" value={editFormData.location || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Location" />
              <input name="area" value={editFormData.area || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Area" />
              <input name="soilType" value={editFormData.soilType || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Soil Type" />
              <input name="price" value={editFormData.price || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Price" />
              <input name="ownerName" value={editFormData.ownerName || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Owner Name" />
              <input name="mobile" value={editFormData.mobile || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Mobile Number" />
              <input name="address" value={editFormData.address || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" placeholder="Full Address" />
              <input type="date" name="availableFrom" value={editFormData.availableFrom || ""} onChange={handleEditChange} className="border px-3 py-2 rounded" />
              <textarea name="notes" value={editFormData.notes || ""} onChange={handleEditChange} className="border px-3 py-2 rounded col-span-2" placeholder="Notes" rows={3} />
              <input type="file" name="pdf" onChange={handleFileChange} className="border px-3 py-2 rounded" />
              <input type="file" name="image" onChange={handleFileChange} className="border px-3 py-2 rounded" />
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
              <button onClick={() => setEditingIndex(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLand;
