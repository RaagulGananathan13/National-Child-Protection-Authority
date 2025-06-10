// src/pages/LogComplaint/DetailsOfTheComplainant.jsx
import React, { useState } from 'react';

function DetailsOfTheComplainant() {
  const [formData, setFormData] = useState({
    receivedMethod: 'Person',
    complainantName: '',
    complainantNIC: '',
    gender: 'Unknown',
    complainantAddress: '',
    contactNumber: '',
    province: '',
    district: '',
    divisionalSecretariat: '',
    relationshipToVictim: '',
    complainantDetailsConfidential: false,
    sendSMSConfirmation: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Complainant</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Received Method */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Received Method</label>
          <select
            name="receivedMethod"
            value={formData.receivedMethod}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Person">Person</option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
          </select>
        </div>

        {/* Complainant Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Complainant Name</label>
          <input
            type="text"
            name="complainantName"
            value={formData.complainantName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Name"
          />
        </div>

        {/* Complainant NIC */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Complainant NIC</label>
          <input
            type="text"
            name="complainantNIC"
            value={formData.complainantNIC}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="NIC"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Unknown">Unknown</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Complainant Address */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Complainant Address</label>
          <textarea
            name="complainantAddress"
            value={formData.complainantAddress}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            rows="4"
            placeholder="Address"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Number"
          />
        </div>

        {/* Province */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Province 1">Province 1</option>
            <option value="Province 2">Province 2</option>
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="District 1">District 1</option>
            <option value="District 2">District 2</option>
          </select>
        </div>

        {/* Divisional Secretariat */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Divisional Secretariat</label>
          <select
            name="divisionalSecretariat"
            value={formData.divisionalSecretariat}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Secretariat 1">Secretariat 1</option>
            <option value="Secretariat 2">Secretariat 2</option>
          </select>
        </div>
      </div>

      {/* Relationship to the Victim */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Relationship to the Victim</label>
        <select
          name="relationshipToVictim"
          value={formData.relationshipToVictim}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Nothing selected</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
          <option value="Relative">Relative</option>
        </select>
      </div>

      {/* Complainant Details Are Confidential */}
      <div className="flex items-center mb-4">
        <label className="text-sm font-semibold text-gray-700 mr-4">Complainant Details Are Confidential</label>
        <input
          type="checkbox"
          name="complainantDetailsConfidential"
          checked={formData.complainantDetailsConfidential}
          onChange={handleToggleChange}
          className="toggle-checkbox"
        />
      </div>

      {/* Send SMS Confirmation After Submit */}
      <div className="flex items-center mb-4">
        <label className="text-sm font-semibold text-gray-700 mr-4">Send SMS Confirmation After Submit</label>
        <input
          type="checkbox"
          name="sendSMSConfirmation"
          checked={formData.sendSMSConfirmation}
          onChange={handleToggleChange}
          className="toggle-checkbox"
        />
      </div>
    </div>
  );
}

export default DetailsOfTheComplainant;
