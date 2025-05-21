import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

function ContractDetails() {
  const [contracts, setContracts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [editFields, setEditFields] = useState({ priceRange: '', terms: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/contracts')
      .then(res => setContracts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = (id, status) => {
    axios.put(`http://localhost:5000/api/contracts/${id}/status`, { status })
      .then(() => {
        setContracts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      });
  };

  const openEditModal = (contract) => {
    setSelectedContract(contract);
    setEditFields({ priceRange: contract.priceRange, terms: contract.terms });
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:5000/api/contracts/${selectedContract._id}/suggest-edit`, editFields)
      .then(() => {
        alert('Edit suggestion submitted!');
        setEditModalOpen(false);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contract Requests</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Buyer</th>
            <th>Farmer</th>
            <th>Crop</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Advance</th>
            <th>Terms</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr key={contract._id} className="border-t">
              <td className="px-4 py-2">{contract.buyerName}</td>
              <td>{contract.farmerName}</td>
              <td>{contract.cropType}</td>
              <td>{contract.quantity}</td>
              <td>{contract.priceRange}</td>
              <td>{contract.advancePayment ? 'Yes' : 'No'}</td>
              <td>{contract.terms}</td>
              <td>{contract.startDate?.slice(0, 10)}</td>
              <td>{contract.endDate?.slice(0, 10)}</td>
              <td className="capitalize">{contract.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(contract._id, 'accepted')}
                  className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
                <button
                  onClick={() => handleStatusChange(contract._id, 'rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                <button
                  onClick={() => openEditModal(contract)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded">Suggest Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Suggest Edit</h3>
          <label className="block mb-2">Price Range</label>
          <input
            type="text"
            value={editFields.priceRange}
            onChange={e => setEditFields({ ...editFields, priceRange: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <label className="block mb-2">Terms & Conditions</label>
          <textarea
            value={editFields.terms}
            onChange={e => setEditFields({ ...editFields, terms: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={handleEditSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ContractDetails;
