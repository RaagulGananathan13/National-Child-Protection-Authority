import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const MyComplaints = () => {
  const [formData, setFormData] = useState({
    requestType: 'Complaint Request',
    reference: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for handling the form submission (e.g., checking tasks based on selected data)
    console.log('Checking tasks for:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Main Content with padding-top to avoid overlapping with the navbar */}
      <div className="pt-20 bg-gray-100 min-h-screen p-6"
        style={{
          backgroundImage: `url('/images/background.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'auto',
        }}
      >
        {/* Header Section */}
        <div className="bg-white p-6 rounded-md shadow-lg mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Complaints</h2>

          {/* Form to Select Request Type, Reference, Date */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Request Type Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="requestType" className="text-sm font-semibold text-gray-700 mb-2">Request Type</label>
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="Complaint Request">Complaint Request</option>
                  <option value="Police Complaint">Police Complaint</option>
                  <option value="Video Evidence">Video Evidence</option>
                  <option value="Vulnerable Child">Vulnerable Child</option>
                </select>
              </div>

              {/* Reference Input */}
              <div className="flex flex-col">
                <label htmlFor="reference" className="text-sm font-semibold text-gray-700 mb-2">Reference</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-md"
                  placeholder="Enter reference"
                />
              </div>

              {/* Date Input */}
              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Check Tasks Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Check Tasks
              </button>
            </div>
          </form>
        </div>

        {/* Below content could show complaints or tasks after checking */}
        <div className="bg-white p-6 rounded-md shadow-lg max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Complaints List</h3>
          {/* Table for displaying complaints (you can add dynamic data here) */}
          <table className="min-w-full table-auto border">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Reference</th>
                <th className="px-4 py-2 border-b">Request Type</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Example data rows */}
              <tr>
                <td className="px-4 py-2 border-b">12345</td>
                <td className="px-4 py-2 border-b">Complaint Request</td>
                <td className="px-4 py-2 border-b">2025-03-26</td>
                <td className="px-4 py-2 border-b">Pending</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">67890</td>
                <td className="px-4 py-2 border-b">Police Complaint</td>
                <td className="px-4 py-2 border-b">2025-03-25</td>
                <td className="px-4 py-2 border-b">Resolved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
