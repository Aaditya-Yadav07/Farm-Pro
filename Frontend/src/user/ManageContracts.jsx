import React, { useState } from 'react';
import './ManageContracts.css';
import { Link } from 'react-router-dom';

const ManageContracts = () => {
    const [status, setStatus] = useState('proposed');

    return (
        <div className="contracts-container">
            <div className="relative">
  {/* Top-right Dashboard button */}
  <div className="absolute top-4 right-4 z-20">
    <button 
      onClick={() => navigate('/farmerdashboard')} 
      className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500"
    >
      👤 Dashboard
    </button>
  </div>

  {/* Page title */}
  <h1 className="bg-[#0d2c45] text-white text-3xl font-semibold text-left mb-10 p-4">
    Manage Products
  </h1>

  {/* ...rest of your page content... */}
</div>


            <div className="filter-section">
                <label htmlFor="status-filter">Filter By Status:</label>
                <select
                    id="status-filter"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="proposed">proposed</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="completed">completed</option>
                </select>
            </div>

            <table className="contracts-table">
                <thead>
                    <tr>
                        <th>Duration (months)</th>
                        <th>Document</th>
                        <th>Status</th>
                        <th>Contract</th>
                        <th>Product/Land</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data rows can be added dynamically here */}
                </tbody>
            </table>
        </div>
    );
};

export default ManageContracts;
