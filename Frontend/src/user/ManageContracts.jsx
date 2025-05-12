import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingContract, setEditingContract] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Fetch contracts
  const fetchContracts = () => {
    axios
      .get("http://localhost:5000/api/contracts")
      .then((res) => setContracts(res.data))
      .catch((err) => console.error("Failed to fetch contracts:", err));
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  // Filtered contracts
  const filteredContracts =
    filterStatus === "All"
      ? contracts
      : contracts.filter((contract) => contract.status === filterStatus);

  // Delete contract
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contracts/${id}`);
        fetchContracts();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // Save edited contract
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contracts/${editingContract._id}`, {
        ...editingContract,
        status: updatedStatus,
      });
      setEditingContract(null);
      fetchContracts();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="bg-[#0d2c45] fixed top-0 left-0 right-0 z-50 p-4 text-white text-2xl font-bold">
        Manage Contracts
      </h2>

      <div className="mt-20 mb-4 flex items-center space-x-4">
        <label className="font-semibold text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">PDF</th>
              <th className="px-4 py-2 text-left">Delivery Date</th>
              <th className="px-4 py-2 text-left">Made On</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract, index) => (
              <tr key={contract._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{contract.name}</td>
                <td className="px-4 py-2">{contract.duration}</td>
                <td className="px-4 py-2">
                  <a
                    href={contract.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF
                  </a>
                </td>
                <td className="px-4 py-2">{contract.deliveryDate}</td>
                <td className="px-4 py-2">{contract.contractDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      contract.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : contract.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contract.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingContract(contract);
                      setUpdatedStatus(contract.status);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contract._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredContracts.length === 0 && (
          <div className="text-center py-4 text-gray-500">No contracts found.</div>
        )}
      </div>

      {/* Edit Modal */}
      {editingContract && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Edit Contract</h3>
            <label className="block mb-2">Status</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="w-full p-2 border mb-4 rounded"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingContract(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContracts;


