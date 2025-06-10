import React, { useState } from 'react';

function BasicInformation() {
  const [receivedDate, setReceivedDate] = useState('');
  const [receivedTime, setReceivedTime] = useState('');
  const [receivedMedium, setReceivedMedium] = useState('');
  const [complaintMedium, setComplaintMedium] = useState('Sinhala');
  const [message, setMessage] = useState(''); // For success/error feedback

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Prepare data for the API (only the four fields)
    const complaintData = {
      receivedDate,
      receivedTime,
      receivedMedium,
      complaintMedium,
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
      // Reset form
      setReceivedDate('');
      setReceivedTime('');
      setReceivedMedium('');
      setComplaintMedium('Sinhala');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="receivedDate" className="block text-sm font-semibold text-gray-700">
              Received Date (*)
            </label>
            <input
              type="date"
              id="receivedDate"
              value={receivedDate}
              onChange={(e) => setReceivedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="receivedTime" className="block text-sm font-semibold text-gray-700">
              Received Time (*)
            </label>
            <input
              type="time"
              id="receivedTime"
              value={receivedTime}
              onChange={(e) => setReceivedTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="receivedMedium" className="block text-sm font-semibold text-gray-700">
              Received Medium (*)
            </label>
            <select
              id="receivedMedium"
              value={receivedMedium}
              onChange={(e) => setReceivedMedium(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Nothing selected</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="In Person">In Person</option>
            </select>
          </div>

          <div>
            <label htmlFor="complaintMedium" className="block text-sm font-semibold text-gray-700">
              Complaint Medium
            </label>
            <select
              id="complaintMedium"
              value={complaintMedium}
              onChange={(e) => setComplaintMedium(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Display success/error message */}
        {message && (
          <div className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

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

export default BasicInformation;