import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Managecontract = () => {
  const [contracts, setContracts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const storedContracts = JSON.parse(localStorage.getItem('contractData')) || [];
    setContracts(storedContracts);
  }, []);

  const filteredContracts =
    statusFilter === 'all'
      ? contracts
      : contracts.filter((contract) => contract.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-blue-900 p-4 rounded">
        <h1 className="text-xl font-bold text-white">Manage Crop Contracts</h1>
        <Link to="/corporatedashboard">
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500">
            👤 Dashboard
          </button>
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-medium text-gray-700">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="proposed">Proposed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Contracts Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Crop</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Document</th>
              <th className="p-3">Status</th>
              <th className="p-3">Details</th>
              <th className="p-3">Land</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">No contracts found.</td>
              </tr>
            ) : (
              filteredContracts.map((contract, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{contract.product || 'N/A'}</td>
                  <td className="p-3">{contract.duration || 'N/A'}</td>
                  <td className="p-3">
                    {contract.document ? (
                      <a href={contract.document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="p-3 capitalize">{contract.status || 'N/A'}</td>
                  <td className="p-3">{contract.contractDetails || 'N/A'}</td>
                  <td className="p-3">{contract.land || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managecontract;
