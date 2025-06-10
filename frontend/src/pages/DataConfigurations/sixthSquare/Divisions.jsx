import React, { useState } from 'react';
import Navbar from '../../../components/Navbar'; // Same Navbar component as in other pages

const Divisions = () => {
  // Sample data for divisions
  const initialDivisions = [
    'Law Enforcement Division',
    'Administration Unit',
    'Special Police Investigation Unit',
    'NCPA Investigation Unit',
    'Legal Unit',
  ];

  // State for divisions and modal
  const [divisions, setDivisions] = useState(initialDivisions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDivision, setNewDivision] = useState('');

  // Handle adding a new division
  const handleAddDivision = () => {
    if (newDivision) {
      setDivisions([...divisions, newDivision]);
      setNewDivision('');
      setIsModalOpen(false);
    }
  };

  // Handle deleting a division
  const handleDeleteDivision = (division) => {
    setDivisions(divisions.filter((d) => d !== division));
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }} // Same background image as other pages
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Divisions</h1>

      {/* Main Content Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        {/* Header with Title and Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Divisions</h2>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View Data
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {divisions.length > 0 ? (
                divisions.map((division, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{division}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteDivision(division)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                    No divisions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {divisions.length} of {divisions.length} entries
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-200" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border rounded bg-gray-200">1</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-200" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding New Division */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New NCPA Head Office Division</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newDivision"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Division
              </label>
              <input
                id="newDivision"
                type="text"
                value={newDivision}
                onChange={(e) => setNewDivision(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter division name"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={handleAddDivision}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Divisions;