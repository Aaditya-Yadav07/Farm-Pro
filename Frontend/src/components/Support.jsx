import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate this with backend API
    console.log('Support Form Submitted:', formData);
    alert('Support request submitted successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
         <Link
      to="/"
      className="absolute top-6 left-6 px-3 py-2 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-500 transition duration-200"
    >
      ← Back to Home
    </Link>
      <h2 className="text-3xl font-bold mb-6 text-green-700">Farm Pro Support</h2>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            className="w-full p-2 border rounded"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            className="w-full p-2 border rounded"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>

      {/* FAQs */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <strong>Q: What is contract farming?</strong>
            <p>A: Contract farming is an agreement between farmers and buyers to produce and supply agricultural products under predetermined agreements.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <strong>Q: How do I initiate a contract?</strong>
            <p>A: You can go to the 'Manage Contracts' section in your dashboard and fill out a contract initiation form.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <strong>Q: Can I cancel a contract?</strong>
            <p>A: Contracts once accepted can only be cancelled based on the agreement clauses. Contact support with your contract ID.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
