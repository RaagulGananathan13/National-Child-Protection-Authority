import React, { useState } from 'react';

function ComplaintWithPolice() {
  const [formData, setFormData] = useState({
    policeDivision: '',
    policeStation: '',
    complaintLoggedDate: '2025-02-21', // Adjusted to ISO format compatibility
    complaintNumber: '',
  });
  const [message, setMessage] = useState(''); // For success/error feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the API, including required fields from the schema
    const complaintData = {
      ...formData,
      // Required fields with defaults (adjust as needed)
      receivedDate: new Date().toISOString().split('T')[0], // Default to today
      receivedTime: '00:00', // Default value
      locationOfIncidentType: 'Unknown', // Required field
      incidentDate: new Date().toISOString().split('T')[0], // Default to today
      incidentTime: '00:00', // Default value
    };

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit complaint');
      }

      const result = await response.json();
      setMessage('Complaint submitted successfully!');
      // Reset form to initial state
      setFormData({
        policeDivision: '',
        policeStation: '',
        complaintLoggedDate: '2025-02-21',
        complaintNumber: '',
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Has complaint been lodged with the Police in this regard</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Police Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Division</label>
            <select
              name="policeDivision"
              value={formData.policeDivision}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Police Division 1">Police Division 1</option>
              <option value="Police Division 2">Police Division 2</option>
            </select>
          </div>

          {/* Police Station */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Station</label>
            <select
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Police Station 1">Police Station 1</option>
              <option value="Police Station 2">Police Station 2</option>
            </select>
          </div>

          {/* Complaint Logged Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Complaint Logged Date</label>
            <input
              type="date"
              name="complaintLoggedDate"
              value={formData.complaintLoggedDate}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Complaint Number */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Complaint Number</label>
            <input
              type="text"
              name="complaintNumber"
              value={formData.complaintNumber}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
              placeholder="Enter complaint number"
            />
          </div>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex pt-3 justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComplaintWithPolice;