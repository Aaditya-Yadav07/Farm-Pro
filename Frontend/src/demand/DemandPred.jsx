// // import React from 'react';
// import Navbar from '../components/Navbar'
// import Footer from '../components/footer';
// // function DemandPred() {
// //   return (
// //     <>
// //       <Navbar/>
// //       <div className="min-h-screen"></div>
// //     <Footer/>
// //     </>
// //   );
// // }

// // export default DemandPred; 
// import React, { useState } from "react";

// const CropPredictionForm = () => {
//   const [formData, setFormData] = useState({
//     rainfall: "",
//     humidity: "",
//     temperature: "",
//     nitrogen: "",
//     phosphorous: "",
//     potassium: "",
//     pH: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);
//     alert("Form Submitted Successfully!");
//   };

//   return (
//     <>
//     <Navbar/>

//     <div>
//       <h2>CROP PREDICTION</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Rainfall:
//           <input
//             type="number"
//             name="rainfall"
//             placeholder="Rainfall in area (mm)"
//             value={formData.rainfall}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Humidity:
//           <input
//             type="number"
//             name="humidity"
//             placeholder="Humidity (%)"
//             value={formData.humidity}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Temperature:
//           <input
//             type="number"
//             name="temperature"
//             placeholder="Temperature (°C)"
//             value={formData.temperature}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Nitrogen:
//           <input
//             type="number"
//             name="nitrogen"
//             placeholder="Land Nitrogen Content"
//             value={formData.nitrogen}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Phosphorous:
//           <input
//             type="number"
//             name="phosphorous"
//             placeholder="Land Phosphorous Content"
//             value={formData.phosphorous}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Potassium:
//           <input
//             type="number"
//             name="potassium"
//             placeholder="Land Potassium Content"
//             value={formData.potassium}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           pH:
//           <input
//             type="number"
//             name="pH"
//             placeholder="Land pH"
//             value={formData.pH}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//      <Footer/>
//      </>
//   );
// };

// export default CropPredictionForm;
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const DemandPred = () => {
//   const [formData, setFormData] = useState({
//     rainfall: "",
//     humidity: "",
//     temperature: "",
//     nitrogen: "",
//     phosphorous: "",
//     potassium: "",
//     pH: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);
//     alert("Form Submitted Successfully!");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
//           <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Crop Prediction</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {[
//               { label: "Rainfall", name: "rainfall", placeholder: "Rainfall in area (mm)" },
//               { label: "Humidity", name: "humidity", placeholder: "Humidity (%)" },
//               { label: "Temperature", name: "temperature", placeholder: "Temperature (°C)" },
//               { label: "Nitrogen", name: "nitrogen", placeholder: "Land Nitrogen Content" },
//               { label: "Phosphorous", name: "phosphorous", placeholder: "Land Phosphorous Content" },
//               { label: "Potassium", name: "potassium", placeholder: "Land Potassium Content" },
//               { label: "pH", name: "pH", placeholder: "Land pH" },
//             ].map((input) => (
//               <div key={input.name}>
//                 <label className="block text-gray-600 text-sm font-medium mb-1">{input.label}:</label>
//                 <input
//                   type="number"
//                   name={input.name}
//                   placeholder={input.placeholder}
//                   value={formData[input.name]}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//             ))}

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default DemandPred;



import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Lognav from "../components/Lognav";

const DemandPred = () => {
  const [formData, setFormData] = useState({
    rainfall: "",
    humidity: "",
    temperature: "",
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    pH: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <>
      <Lognav />
      {/* Background Image */}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-16"
        style={{ backgroundImage: "url('/public/cp_background.jpeg')" }}
      >
        {/* <Link
                  to="/"
                  className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
                >
                  ← Back to Home
                </Link> */}
        {/* Glassmorphism Form Container */}
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/30">
          <h2 className="text-3xl font-bold text-center text-black mb-6">🌿 Crop Prediction 🌾</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Rainfall", name: "rainfall", placeholder: "Rainfall in area (mm)" },
              { label: "Humidity", name: "humidity", placeholder: "Humidity (%)" },
              { label: "Temperature", name: "temperature", placeholder: "Temperature (°C)" },
              { label: "Nitrogen", name: "nitrogen", placeholder: "Land Nitrogen Content" },
              { label: "Phosphorous", name: "phosphorous", placeholder: "Land Phosphorous Content" },
              { label: "Potassium", name: "potassium", placeholder: "Land Potassium Content" },
              { label: "pH", name: "pH", placeholder: "Land pH" },
            ].map((input) => (
              <div key={input.name}>
                <label className="block text-black text-sm font-medium mb-1">{input.label}:</label>
                <input
                  type="number"
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-400 transition-all duration-300"
            >
              🚜 Predict Now
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DemandPred;





