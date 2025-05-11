import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newFiles, setNewFiles] = useState({ document: null, image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        available: !currentAvailability
      });
      fetchProducts();
    } catch (err) {
      setError("Failed to update availability.");
      console.error("Availability toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(products[index]);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewFiles({ ...newFiles, [name]: files[0] });
  };

  const handleEditSubmit = async () => {
    if (!editFormData.cropType || !editFormData.cropName || !editFormData.price || !editFormData.quantity) {
      setError("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("cropType", editFormData.cropType);
    formData.append("cropName", editFormData.cropName);
    formData.append("expectedPriceRange", editFormData.expectedPriceRange);
    formData.append("quantity", editFormData.quantity);
    formData.append("description", editFormData.description);
    formData.append("additionalNotes", editFormData.additionalNotes);
    formData.append("harvestMonth", editFormData.harvestMonth);
    formData.append("deliveryMonth", editFormData.deliveryMonth);
    formData.append("mobileNumber", editFormData.mobileNumber);
    formData.append("address", editFormData.address);
    formData.append("experience", editFormData.experience);

    if (newFiles.document) {
      formData.append("ownershipDocument", newFiles.document);
    }
    if (newFiles.image) {
      formData.append("image", newFiles.image);
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${editFormData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setEditingIndex(null);
      fetchProducts();
    } catch (err) {
      setError("Failed to save product changes.");
      console.error("Edit submit error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen p-6 bg-gray-50">
      
      <div className="relative">
  {/* Top-right Dashboard button */}
 
  </div>
  {/* Page title */}
  <h1 className="bg-[#0d2c45] text-white text-3xl font-semibold text-left mb-10 p-4 fixed top-0 left-0 right-0 z-50">
    Manage Products  <div className="absolute top-4 right-4 z-50">
    <button 
      onClick={() => navigate('/farmerdashboard')} 
      className="bg-yellow-400 text-black font-semibold py-0 px-2 rounded hover:bg-yellow-500"
    >
      👤 Dashboard
    </button>
  </div>
  </h1>
  
       
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded my-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mt-20">
        <table className="min-w-full border border-gray-300 bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-3 py-2">Serial No.</th>
              <th className="px-3 py-2">Crop Type</th>
              <th className="px-3 py-2">Crop Name</th>
              <th className="px-3 py-2">ExpectedPriceRange</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Additional Notes</th>
              <th className="px-3 py-2">Document Ownership</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2">{prod.cropType}</td>
                <td className="px-3 py-2">{prod.cropName}</td>
                <td className="px-3 py-2">₹{prod.expectedPriceRange}</td>
                <td className="px-3 py-2">{prod.quantity} {prod.unit}</td>
                <td className="px-3 py-2">{prod.description}</td>
                <td className="px-3 py-2">{prod.additionalNotes}</td>
                <td className="px-3 py-2">
                  {`http://localhost:5000/${prod.ownershipDocument}` ? (
                    <a href={prod.ownershipDocument} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>
                  ) : (
                    "No Document"
                  )}
                </td>
                <td className="px-3 py-2">
                  <span className={prod.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {prod.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-2">
                  <button onClick={() => handleToggleAvailability(prod._id, prod.available)} className="text-blue-600 hover:underline">
                    {prod.available ? "Unmark" : "Mark"}
                  </button>
                  <button onClick={() => handleEditClick(index)} className="text-yellow-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[768px] max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <input
          name="cropType"
          value={editFormData.cropType || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Crop Type"
        />
        <input
          name="cropName"
          value={editFormData.cropName || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Crop Name"
        />
        <input
          name="expectedPriceRange"
          value={editFormData.expectedPriceRange || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Expected Price Range"
        />
        <input
          name="quantity"
          value={editFormData.quantity || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Quantity"
        />
        <input
          name="harvestMonth"
          value={editFormData.harvestMonth || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Harvest Month"
        />
        <input
          name="deliveryMonth"
          value={editFormData.deliveryMonth || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Delivery Month"
        />
        <input
          name="mobileNumber"
          value={editFormData.mobileNumber || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Mobile Number"
        />
        <input
          name="address"
          value={editFormData.address || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Address"
        />
        <input
          name="experience"
          value={editFormData.experience || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Experience"
        />
        <textarea
          name="description"
          value={editFormData.description || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Description"
        />
        <textarea
          name="additionalNotes"
          value={editFormData.additionalNotes || ""}
          onChange={handleEditChange}
          className="border px-3 py-2 rounded"
          placeholder="Additional Notes"
        />
        <input
          type="file"
          name="document"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={() => setEditingIndex(null)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleEditSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
  
)}

    </div>
  );
};

export default ManageProduct;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ManageProduct = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [newFiles, setNewFiles] = useState({ document: null, image: null });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch Products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/products');
//       setProducts(res.data);
//     } catch (err) {
//       setError("Failed to fetch products.");
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to delete product.");
//       console.error("Delete error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleAvailability = async (id, currentAvailability) => {
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/api/products/${id}`, {
//         available: !currentAvailability
//       });
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to update availability.");
//       console.error("Availability toggle error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (index) => {
//     setEditingIndex(index);
//     setEditFormData(products[index]);
//   };

//   const handleEditChange = (e) => {
//     setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setNewFiles({ ...newFiles, [name]: files[0] });
//   };

//   const handleEditSubmit = async () => {
//     if (!editFormData.cropType || !editFormData.cropName || !editFormData.price || !editFormData.quantity) {
//       setError("Please fill out all required fields.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("cropType", editFormData.cropType);
//     formData.append("cropName", editFormData.cropName);
//     formData.append("expectedPriceRange", editFormData.expectedPriceRange);
//     formData.append("quantity", editFormData.quantity);
//     formData.append("description", editFormData.description);
//     formData.append("additionalNotes", editFormData.additionalNotes);
//     formData.append("harvestMonth", editFormData.harvestMonth);
//     formData.append("deliveryMonth", editFormData.deliveryMonth);
//     formData.append("mobileNumber", editFormData.mobileNumber);
//     formData.append("address", editFormData.address);
//     formData.append("experience", editFormData.experience);
  
//     if (newFiles.document) {
//       formData.append("ownershipDocument", newFiles.document);
//     }
//     if (newFiles.image) {
//       formData.append("image", newFiles.image);
//     }
  
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/api/products/${editFormData._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       setEditingIndex(null);
//       fetchProducts();
//     } catch (err) {
//       setError("Failed to save product changes.");
//       console.error("Edit submit error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <button onClick={() => navigate('/farmerdashboard')} className="mb-4 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500">
//         👤 Dashboard
//       </button>
//       <h1 className="text-3xl font-semibold text-center mb-6">Manage Products</h1>

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="flex justify-center my-4">
//           <div className="loader">Loading...</div>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded my-4">
//           {error}
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 bg-white rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="px-3 py-2">Serial No.</th>
//               <th className="px-3 py-2">Crop Type</th>
//               <th className="px-3 py-2">Crop Name</th>
//               <th className="px-3 py-2">Expected Price Range</th>
//               <th className="px-3 py-2">Quantity</th>
//               <th className="px-3 py-2">Description</th>
//               <th className="px-3 py-2">Additional Notes</th>
//               <th className="px-3 py-2">Document Ownership</th>
//               <th className="px-3 py-2">Status</th>
//               <th className="px-3 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={index} className="text-center border-t">
//                 <td className="px-3 py-2">{index + 1}</td>
//                 <td className="px-3 py-2">{prod.cropType}</td>
//                 <td className="px-3 py-2">{prod.cropName}</td>
//                 <td className="px-3 py-2">₹{prod.expectedPriceRange}</td>
//                 <td className="px-3 py-2">{prod.quantity} {prod.unit}</td>
//                 <td className="px-3 py-2">{prod.description}</td>
//                 <td className="px-3 py-2">{prod.additionalNotes}</td>
//                 <td className="px-3 py-2">
//                   {prod.ownershipDocument ? (
//                     <a href={prod.ownershipDocument} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a>
//                   ) : (
//                     "No Document"
//                   )}
//                 </td>
//                 <td className="px-3 py-2">
//                   <span className={prod.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
//                     {prod.available ? "Available" : "Unavailable"}
//                   </span>
//                 </td>
//                 <td className="px-3 py-2 space-x-2">
//                   <button onClick={() => handleToggleAvailability(prod._id, prod.available)} className="text-blue-600 hover:underline">
//                     {prod.available ? "Unmark" : "Mark"}
//                   </button>
//                   <button onClick={() => handleEditClick(index)} className="text-yellow-600 hover:underline">Edit</button>
//                   <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {products.length === 0 && (
//               <tr>
//                 <td colSpan="10" className="text-center py-4 text-gray-500">No products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {editingIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[768px] max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-semibold mb-4 text-center">Edit Product</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <input
//                 name="cropType"
//                 value={editFormData.cropType || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Crop Type"
//               />
//               <input
//                 name="cropName"
//                 value={editFormData.cropName || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Crop Name"
//               />
//               <input
//                 name="expectedPriceRange"
//                 value={editFormData.expectedPriceRange || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Expected Price Range"
//               />
//               <input
//                 name="quantity"
//                 value={editFormData.quantity || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Quantity"
//               />
//               <input
//                 name="harvestMonth"
//                 value={editFormData.harvestMonth || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Harvest Month"
//               />
//               <input
//                 name="deliveryMonth"
//                 value={editFormData.deliveryMonth || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Delivery Month"
//               />
//               <input
//                 name="mobileNumber"
//                 value={editFormData.mobileNumber || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Mobile Number"
//               />
//               <input
//                 name="address"
//                 value={editFormData.address || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Address"
//               />
//               <input
//                 name="experience"
//                 value={editFormData.experience || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Experience"
//               />
//               <textarea
//                 name="description"
//                 value={editFormData.description || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Description"
//               />
//               <textarea
//                 name="additionalNotes"
//                 value={editFormData.additionalNotes || ""}
//                 onChange={handleEditChange}
//                 className="border px-3 py-2 rounded"
//                 placeholder="Additional Notes"
//               />
//               <input
//                 type="file"
//                 name="document"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="border px-3 py-2 rounded"
//               />
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="border px-3 py-2 rounded"
//               />
//             </div>

//             <div className="flex justify-end mt-6 space-x-3">
//               <button
//                 onClick={() => setEditingIndex(null)}
//                 className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEditSubmit}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProduct;
