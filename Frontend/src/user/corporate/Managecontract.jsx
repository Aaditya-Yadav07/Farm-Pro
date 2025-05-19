import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuyerContractReview() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contracts')
      .then(res => setContracts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApproveEdit = async (contractId, edits) => {
    try {
      await axios.patch(`http://localhost:5000/api/contracts/${contractId}/finalize-edit`, edits);
      alert('Suggested edits approved and finalized!');
      // Refresh contracts
      const res = await axios.get('http://localhost:5000/api/contracts');
      setContracts(res.data);
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleRejectEdit = async (contractId) => {
    try {
      await axios.patch(`http://localhost:5000/api/contracts/${contractId}/reject-edit`);
      alert('Suggested edits rejected.');
      // Refresh contracts
      const res = await axios.get('http://localhost:5000/api/contracts');
      setContracts(res.data);
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Contract Suggestions</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Buyer</th>
            <th>Farmer</th>
            <th>Crop</th>
            <th>Qty</th>
            <th>Current Price</th>
            <th>Suggested Price</th>
            <th>Current Terms</th>
            <th>Suggested Terms</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr key={contract._id} className="border-t">
              <td>{contract.buyerName}</td>
              <td>{contract.farmerName}</td>
              <td>{contract.cropType}</td>
              <td>{contract.quantity}</td>
              <td>{contract.priceRange}</td>
              <td>{contract.suggestedEdits?.priceRange || '-'}</td>
              <td>{contract.terms}</td>
              <td>{contract.suggestedEdits?.terms || '-'}</td>
              <td className="capitalize">{contract.status}</td>
              <td className="flex gap-2">
                {contract.suggestedEdits ? (
                  <>
                    <button
                      onClick={() => handleApproveEdit(contract._id, contract.suggestedEdits)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve Edit
                    </button>
                    <button
                      onClick={() => handleRejectEdit(contract._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject Edit
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400">No Edit</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyerContractReview;
