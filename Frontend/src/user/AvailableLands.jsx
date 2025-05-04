// import React, { useState, useEffect } from 'react';

// const AvailableLands = () => {
//   const [lands, setLands] = useState([]);
//   const [selectedLand, setSelectedLand] = useState(null);
//   const [contractForm, setContractForm] = useState({
//     contractDuration: '',
//     pricePerAcre: '',
//     totalPrice: '',
//   });

//   useEffect(() => {
//     // Fetch the available lands data from backend or local storage
//     fetchLands();
//   }, []);

//   const fetchLands = async () => {
//     // Replace with an actual API call to fetch available lands for corporates
//     const fetchedLands = [
//       { id: 1, name: 'Land A', location: 'Location A', area: '10 acres' },
//       { id: 2, name: 'Land B', location: 'Location B', area: '15 acres' },
//     ];
//     setLands(fetchedLands);
//   };

//   const handleCreateContract = (landId) => {
//     const land = lands.find((l) => l.id === landId);
//     setSelectedLand(land);
//     setContractForm({
//       contractDuration: '',
//       pricePerAcre: '',
//       totalPrice: '',
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setContractForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit the contract data (make an API call to create the contract)
//     console.log('Contract created for land:', selectedLand, 'with details:', contractForm);
//     alert('Contract created successfully!');
//     setSelectedLand(null); // Clear the selected land
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-5">
//       <h1 className="text-3xl font-semibold text-center mb-8">Available Lands</h1>

//       {/* Land List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {lands.map((land) => (
//           <div
//             key={land.id}
//             className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
//           >
//             <h2 className="text-xl font-semibold">{land.name}</h2>
//             <p className="text-gray-600">{land.location}</p>
//             <p className="text-gray-600">{land.area}</p>
//             <button
//               onClick={() => handleCreateContract(land.id)}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
//             >
//               Create Contract
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Contract Creation Form (Only shows if a land is selected) */}
//       {selectedLand && (
//         <div className="mt-8 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//           <h2 className="text-2xl font-semibold mb-6">Create Contract for {selectedLand.name}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="contractDuration"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Contract Duration (in months)
//               </label>
//               <input
//                 type="number"
//                 name="contractDuration"
//                 value={contractForm.contractDuration}
//                 onChange={handleInputChange}
//                 id="contractDuration"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="pricePerAcre" className="block text-sm font-medium text-gray-700">
//                 Price per Acre
//               </label>
//               <input
//                 type="number"
//                 name="pricePerAcre"
//                 value={contractForm.pricePerAcre}
//                 onChange={handleInputChange}
//                 id="pricePerAcre"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
//                 Total Price
//               </label>
//               <input
//                 type="number"
//                 name="totalPrice"
//                 value={contractForm.totalPrice}
//                 onChange={handleInputChange}
//                 id="totalPrice"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
//             >
//               Submit Contract
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableLands;






import React, { useState, useEffect } from 'react';

const AvailableLands = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [contractForm, setContractForm] = useState({
    contractDuration: '',
    pricePerAcre: '',
    totalPrice: '',
  });

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = () => {
    // Fetch the available lands data from localStorage
    const fetchedLands = JSON.parse(localStorage.getItem('landData')) || [];
    setLands(fetchedLands);
  };

  const handleLandDetails = (landId) => {
    const land = lands.find((l) => l.id === landId);
    setSelectedLand(land);
  };

  const handleCreateContract = (landId) => {
    const land = lands.find((l) => l.id === landId);
    setSelectedLand(land);
    setContractForm({
      contractDuration: '',
      pricePerAcre: '',
      totalPrice: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the contract data (make an API call to create the contract)
    console.log('Contract created for land:', selectedLand, 'with details:', contractForm);
    alert('Contract created successfully!');
    setSelectedLand(null); // Clear the selected land
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-semibold text-center mb-8">Available Lands</h1>

      {/* Land List (Grid View) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lands.map((land) => (
          <div
            key={land.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold">{land.title}</h2>
            <p className="text-gray-600">{land.location}</p>
            <p className="text-gray-600">{land.area} acres</p>
            <button
              onClick={() => handleLandDetails(land.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Land Details View (Only shows if a land is selected) */}
      {selectedLand && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Land Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p><strong>Title:</strong> {selectedLand.title}</p>
              <p><strong>Location:</strong> {selectedLand.location}</p>
              <p><strong>Area:</strong> {selectedLand.area} acres</p>
              <p><strong>Soil Type:</strong> {selectedLand.soilType}</p>
              <p><strong>Price:</strong> ₹{selectedLand.price}/month</p>
              <p><strong>Owner:</strong> {selectedLand.ownerName}</p>
              <p><strong>Mobile:</strong> {selectedLand.mobile}</p>
              <p><strong>Address:</strong> {selectedLand.address}</p>
              <p><strong>Available From:</strong> {selectedLand.availableFrom}</p>
              <p><strong>Notes:</strong> {selectedLand.notes}</p>
              {selectedLand.imageUrl && (
                <img src={selectedLand.imageUrl} alt="Land" className="w-full h-48 object-cover rounded mb-4" />
              )}
              {selectedLand.pdfName && (
                <p><strong>Registration Proof:</strong> {selectedLand.pdfName}</p>
              )}
            </div>

            {/* Create Contract Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Create Contract</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="contractDuration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contract Duration (in months)
                  </label>
                  <input
                    type="number"
                    name="contractDuration"
                    value={contractForm.contractDuration}
                    onChange={handleInputChange}
                    id="contractDuration"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="pricePerAcre" className="block text-sm font-medium text-gray-700">
                    Price per Acre
                  </label>
                  <input
                    type="number"
                    name="pricePerAcre"
                    value={contractForm.pricePerAcre}
                    onChange={handleInputChange}
                    id="pricePerAcre"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
                    Total Price
                  </label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={contractForm.totalPrice}
                    onChange={handleInputChange}
                    id="totalPrice"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Submit Contract
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableLands;
