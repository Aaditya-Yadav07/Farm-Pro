// import React from 'react';
// import Navbar from '../components/Navbar'
// import Footer from '../components/footer';
// function Disease() { 
//   return (
//    <>
//     <Navbar/>
//     <div className="min-h-screen"></div>
//     <Footer/>
//    </>
//   );
// }

// export default Disease; 

// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// // import { Button } from '../components/ui/Button';

// function Disease() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
//         <main className="flex flex-col items-center mt-10 p-6 bg-white shadow-lg rounded-lg w-3/4 max-w-md">
//           <h2 className="text-lg font-semibold text-center mb-4">
//             Find out which disease has been caught by your plant
//           </h2>
//           <label className="block mb-4">
//             <span className="text-gray-700">Please Upload The Image</span>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//             />
//           </label>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//             Predict
//           </button>
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Disease;


// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// function Disease() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-200 to-green-500 p-4">
//         <main className="flex flex-col items-center mt-10 p-8 bg-white shadow-2xl rounded-lg w-11/12 md:w-3/4 lg:w-1/2 border border-green-300">
//           <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
//             Detect Crop Disease Instantly
//           </h2>
//           <p className="text-center text-gray-700 mb-6">
//             Upload an image of your plant to identify possible diseases and get recommendations.
//           </p>
//           <label className="block w-full text-center">
//             <span className="text-gray-800 font-medium">Upload Plant Image</span>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:border-0 file:text-sm file:font-semibold file:bg-green-700 file:text-white hover:file:bg-green-800 rounded-lg shadow-md cursor-pointer"
//             />
//           </label>
//           <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
//             Predict Disease
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
import { Link } from 'react-router-dom';
import Lognav from '../components/Lognav';

function Disease() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <Lognav />
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" 
        style={{ backgroundImage: "url('/crop-field.jpg')" }}
      >
        {/* <Link
                  to="/"
                  className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  ← Back to Home
                </Link> */}
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
              onChange={handleFileChange}
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-400"
            />
          </label>
          <button className="mt-6 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-green-400">
            🔍 Predict Disease
          </button>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Disease;