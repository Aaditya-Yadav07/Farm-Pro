import React, { useState } from "react";

const MakeContractPage = () => {
  const [farmerDetails, setFarmerDetails] = useState({
    name: "",
    address: "",
    contact: "",
    landLocation: "",
    landSize: "",
    crop: "",
    ownershipStatus: "",
    bankDetails: "",
  });

  const [corporateDetails, setCorporateDetails] = useState({
    companyName: "",
    contactInfo: "",
    responsiblePersonnel: "",
    registrationDetails: "",
    businessAddress: "",
  });

  const [contractDetails, setContractDetails] = useState({
    cropType: "",
    quantity: "",
    expectedYield: "",
    paymentStructure: "",
    paymentFrequency: "",
    paymentMode: "",
    deliveryLocation: "",
    deliverySchedule: "",
    qualityAssurance: "",
  });

  const [termsAndConditions, setTermsAndConditions] = useState({
    startDate: "",
    endDate: "",
    farmerObligations: "",
    corporateObligations: "",
    forceMajeure: "",
    terminationClause: "",
  });

  const handleChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Create Contract</h1>

      {/* Farmer Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Farmer Details</h2>
        <input
          type="text"
          name="name"
          value={farmerDetails.name}
          onChange={(e) => handleChange(e, setFarmerDetails)}
          placeholder="Farmer Name"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="text"
          name="address"
          value={farmerDetails.address}
          onChange={(e) => handleChange(e, setFarmerDetails)}
          placeholder="Farmer Address"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="text"
          name="contact"
          value={farmerDetails.contact}
          onChange={(e) => handleChange(e, setFarmerDetails)}
          placeholder="Farmer Contact Information"
          className="w-full p-2 mb-2 border rounded-md"
        />
        {/* Add other fields like land location, size, etc. */}
      </div>

      {/* Corporate Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Corporate Details</h2>
        <input
          type="text"
          name="companyName"
          value={corporateDetails.companyName}
          onChange={(e) => handleChange(e, setCorporateDetails)}
          placeholder="Company Name"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="text"
          name="contactInfo"
          value={corporateDetails.contactInfo}
          onChange={(e) => handleChange(e, setCorporateDetails)}
          placeholder="Corporate Contact Info"
          className="w-full p-2 mb-2 border rounded-md"
        />
        {/* Add other fields for corporate details */}
      </div>

      {/* Crop and Payment Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Crop and Payment Details</h2>
        <input
          type="text"
          name="cropType"
          value={contractDetails.cropType}
          onChange={(e) => handleChange(e, setContractDetails)}
          placeholder="Crop Type"
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="number"
          name="quantity"
          value={contractDetails.quantity}
          onChange={(e) => handleChange(e, setContractDetails)}
          placeholder="Quantity"
          className="w-full p-2 mb-2 border rounded-md"
        />
        {/* Add other crop details like payment frequency, mode, etc. */}
      </div>

      {/* Contract Terms and Conditions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Contract Terms</h2>
        <input
          type="date"
          name="startDate"
          value={termsAndConditions.startDate}
          onChange={(e) => handleChange(e, setTermsAndConditions)}
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="date"
          name="endDate"
          value={termsAndConditions.endDate}
          onChange={(e) => handleChange(e, setTermsAndConditions)}
          className="w-full p-2 mb-2 border rounded-md"
        />
        {/* Add other terms and conditions fields */}
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
        <input
          type="file"
          name="ownershipProof"
          className="w-full p-2 mb-2 border rounded-md"
        />
        {/* Add other file inputs as needed */}
      </div>

      {/* E-Signature */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">E-Signature</h2>
        <input
          type="text"
          name="signature"
          placeholder="Enter your signature"
          className="w-full p-2 mb-2 border rounded-md"
        />
      </div>

      {/* Contract Preview and Submit */}
      <div className="mb-6 flex justify-between items-center">
        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
          Preview Contract
        </button>
        <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600">
          Submit Contract
        </button>
      </div>
    </div>
  );
};

export default MakeContractPage;
