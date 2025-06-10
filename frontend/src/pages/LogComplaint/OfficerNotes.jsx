// src/pages/LogComplaint/OfficerNotes.jsx
import React, { useState } from 'react';

function OfficerNotes() {
  const [formData, setFormData] = useState({
    natureOfComplaint1: '',
    natureOfComplaint2: '',
    gravityOfRequest: 'High Priority',
    sectionDepartment: 'Law and Enforcement Unit',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Officer's Notes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Nature of Complaint 1 */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">The nature of the Complaint - 01 (*)</label>
          <select
            name="natureOfComplaint1"
            value={formData.natureOfComplaint1}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Complaint 1">Complaint 1</option>
            <option value="Complaint 2">Complaint 2</option>
          </select>
        </div>

        {/* Nature of Complaint 2 */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">The nature of the Complaint - 02 (*)</label>
          <select
            name="natureOfComplaint2"
            value={formData.natureOfComplaint2}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Complaint 1">Complaint 1</option>
            <option value="Complaint 2">Complaint 2</option>
          </select>
        </div>

        {/* Gravity of Request */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Gravity of the Request</label>
          <select
            name="gravityOfRequest"
            value={formData.gravityOfRequest}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </div>

        {/* Section/Department */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Section/Department</label>
          <select
            name="sectionDepartment"
            value={formData.sectionDepartment}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Law and Enforcement Unit">Law and Enforcement Unit</option>
            <option value="Child Protection Unit">Child Protection Unit</option>
            <option value="Investigation Unit">Investigation Unit</option>
          </select>
        </div>
      </div>

      {/* Remarks */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
          rows="4"
          placeholder="Details"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OfficerNotes;
