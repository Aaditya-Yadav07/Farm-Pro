import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {


  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500"
      >
        ← Back to Home
      </Link>

      <div className="max-w-5xl mx-auto mt-20 bg-white shadow-md rounded-lg overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Contact Us - Farm Pro</h2>

        <div className="grid md:grid-cols-2 gap-8">
          

          {/* Contact Info */}
          <div className="space-y-4 text-gray-700">
            <h3 className="text-xl font-semibold">Reach Us</h3>
            <p><strong>Email:</strong> support@farmpro.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Lucknow, India</p>
            <p>
              <strong>Working Hours:</strong> <br />
              Monday to Friday - 9 AM to 6 PM <br />
              Saturday - 10 AM to 2 PM
            </p>
            <p className="text-sm text-gray-500">We aim to respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
