import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LandDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const land = location.state?.land;

  // Check if the land object and its properties are available
  const imageSrc = land?.image ? `http://localhost:5000/${land.image.replace(/\\/g, '/')}` : 'default_image_path.jpg'; // Fallback to a default image
  const pdfSrc = land?.pdf ? `http://localhost:5000/${land.pdf.replace(/\\/g, '/')}` : '#'; // Fallback to a link that doesn't break

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-lg mt-10 flex flex-col md:flex-row gap-10  top-0 left-0 right-0 z-50">
      {/* Left: Image */}
      <div className="w-full md:w-1/4">
        <img
          src={imageSrc}
          alt="Land"
          className="w-full h-auto rounded-xl object-cover shadow"
        />
      </div>

      {/* Right: Details */}
      <div className="w-full md:w-1/2 space-y-2">
        <p><strong>Title:</strong> {land.title}</p>
        <p><strong>Owner Name:</strong> {land.ownerName}</p>
        <p><strong>Owner Address:</strong> {land.owneraddress}</p>
        <p><strong>Mobile:</strong> {land.mobile}</p>
        <p><strong>Soil Type:</strong> {land.soilType}</p>
        <p><strong>Land Address:</strong> {land.location}</p>
        <p><strong>Area:</strong> {land.area} in acres </p>
        <p><strong>Price Range:</strong> ₹{land.price}/year</p>
        <p><strong>Available From:</strong> {new Date(land.availableFrom).toDateString()}</p>
        
        <p><strong>Notes:</strong> {land.notes || 'None'}</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={() => alert('Make Contract clicked')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Make Contract
          </button>
          <a
            href={pdfSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg shadow"
          >
            Download Ownership PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandDetail;
