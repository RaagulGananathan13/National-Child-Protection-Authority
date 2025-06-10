import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function UpdateTaskPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requestType, setRequestType] = useState('Complaint Request');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    // Handle the search functionality (e.g., filtering by the selected values)
    console.log("Searching with values:", { startDate, endDate, requestType, status });
  };

  return (
    <div className="p-6 bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('/images/background.jpg')` }}>
      
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Update Task Page</h1>

      {/* Search Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Search Task</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Request Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Request Type</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Complaint Request">Complaint Request</option>
              <option value="Police Complaint">Police Complaint</option>
              <option value="Video Evidence">Video Evidence</option>
              <option value="Vulnerable Child">Vulnerable Child</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Nothing Selected</option>
              <option value="REQUEST COMPLETED">REQUEST COMPLETED</option>
              <option value="REQUEST IN PROGRESS">REQUEST IN PROGRESS</option>
              <option value="REQUEST PENDING">REQUEST PENDING</option>
              <option value="REQUEST REJECTED">REQUEST REJECTED</option>
            </select>
          </div>
        </div>

        {/* Check Tasks Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Check Tasks
          </button>
        </div>
      </div>

      {/* Request Data Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Complaint Number</th>
              <th className="border px-4 py-2">Assigned Date</th>
              <th className="border px-4 py-2">Assigned By</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Current Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example data rows */}
            <tr>
              <td className="border px-4 py-2">12345</td>
              <td className="border px-4 py-2">2025-02-01</td>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">Section 1</td>
              <td className="border px-4 py-2">In Progress</td>
            </tr>
            {/* Additional rows can be added here based on search results */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpdateTaskPage;
