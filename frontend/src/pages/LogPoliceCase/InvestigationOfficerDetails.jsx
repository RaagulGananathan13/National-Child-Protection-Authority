import React, { useState } from 'react';

const InvestigationOfficerDetails = () => {
  const [formData, setFormData] = useState({
    officerId: '',
    officerName: '',
    contactNumber: '',
    officerPosition: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Investigation Officer</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="officerId" className="block text-gray-700">Officer ID</label>
          <input
            type="text"
            id="officerId"
            name="officerId"
            className="w-full p-2 border rounded"
            value={formData.officerId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="officerName" className="block text-gray-700">Officer Name</label>
          <input
            type="text"
            id="officerName"
            name="officerName"
            className="w-full p-2 border rounded"
            value={formData.officerName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="w-full p-2 border rounded"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="officerPosition" className="block text-gray-700">Officer Position</label>
          <select
            id="officerPosition"
            name="officerPosition"
            className="w-full p-2 border rounded"
            value={formData.officerPosition}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            <option value="Detective">Detective</option>
            <option value="Sergeant">Sergeant</option>
            <option value="Inspector">Inspector</option>
            {/* Add more positions if needed */}
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="remarks" className="block text-gray-700">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            className="w-full p-2 border rounded"
            rows="4"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestigationOfficerDetails;
