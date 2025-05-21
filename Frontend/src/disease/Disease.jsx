
// import React, { useState } from 'react';
// import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
// import Lognav from '../components/Lognav';

// function Disease() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <>
//       <Lognav />
//       <div 
//         className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 mt-20" 
//         style={{ backgroundImage: "url('/crop-field.jpg')" }}
//       >
//         {/* <Link
//                   to="/"
//                   className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
//                 >
//                   ← Back to Home
//                 </Link> */}
//         <main className="flex flex-col items-center p-10 bg-white bg-opacity-95 shadow-2xl rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 border border-green-500 backdrop-blur-md">
//           <h2 className="text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-lg">
//             🌿 Detect Crop Disease Instantly 🌱
//           </h2>
//           <p className="text-center text-gray-700 text-lg mb-6">
//             Upload an image of your plant to identify possible diseases and receive expert recommendations.
//           </p>
//           <label className="block w-full text-center">
//             <span className="text-green-700 font-semibold text-lg">Upload Plant Image</span>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-400"
//             />
//           </label>
//           <button className="mt-6 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-green-400">
//             🔍 Predict Disease
//           </button>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Disease;

import React, { useState } from 'react';
import Footer from '../components/Footer';
import Lognav from '../components/Lognav';

function Disease() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResult('');
    setError('');
  };

  const handlePredict = async () => {
    if (!file) {
      setError("Please upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setResult(`Prediction: ${data.predicted_class}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Lognav />
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 mt-20" 
        style={{ backgroundImage: "url('/crop-field.jpg')" }}
      >
        <main className="flex flex-col items-center p-10 bg-white bg-opacity-95 shadow-2xl rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 border border-green-500 backdrop-blur-md">
          <h2 className="text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-lg">
            🌿 Detect Crop Disease Instantly 🌱
          </h2>
          <p className="text-center text-gray-700 text-lg mb-6">
            Upload an image of your plant to identify possible diseases and receive expert recommendations.
          </p>
          <label className="block w-full text-center">
            <span className="text-green-700 font-semibold text-lg">Upload Plant Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-400"
            />
          </label>

          <button
            onClick={handlePredict}
            className="mt-6 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-green-400"
            disabled={loading}
          >
            {loading ? "Predicting..." : "🔍 Predict Disease"}
          </button>

          {result && <p className="mt-6 text-lg font-semibold text-green-800">{result}</p>}
          {error && <p className="mt-6 text-lg font-semibold text-red-600">{error}</p>}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Disease;
