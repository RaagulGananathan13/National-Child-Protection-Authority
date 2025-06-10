import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as requested, but not used for rendering)
const initialData = {
  'Head Office': [],
  'Regional Office': [],
  'Police Station': [],
  Court: ['Registrar'],
  'Labour Offices': [],
  'GN Divisions': [],
  'Probation Child Care': [],
  'VE Units': [],
  'MOH Divisions': [],
  'PHM Divisions': [],
  'Attorney General Department': [],
};

const Designations = () => {
  // State for selections, designations, modal, loading, and error
  const [selectedOfficeType, setSelectedOfficeType] = useState('');
  const [designations, setDesignations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDesignation, setNewDesignation] = useState('');
  const [newAbbreviation, setNewAbbreviation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Office types for dropdown
  const officeTypes = [
    'Head Office',
    'Regional Office',
    'Police Station',
    'Court',
    'Labour Offices',
    'GN Divisions',
    'Probation Child Care',
    'VE Units',
    'MOH Divisions',
    'PHM Divisions',
    'Attorney General Department',
  ];

  // Fetch designations when office type changes
  useEffect(() => {
    if (selectedOfficeType) {
      const fetchDesignations = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/designations', {
            params: { officeType: selectedOfficeType },
          });
          setDesignations(response.data);
        } catch (err) {
          setError('Failed to load designations. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDesignations();
    } else {
      setDesignations([]);
    }
  }, [selectedOfficeType]);

  // Handle office type selection
  const handleOfficeTypeChange = (e) => {
    const officeType = e.target.value;
    setSelectedOfficeType(officeType);
  };

  // Handle adding a new designation
  const handleAddDesignation = async () => {
    if (!newDesignation.trim()) {
      setError('Designation name cannot be empty.');
      return;
    }
    if (selectedOfficeType) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/designations', {
          officeType: selectedOfficeType,
          designation: newDesignation.trim(),
          abbreviation: newAbbreviation.trim() || '',
        });
        setDesignations(response.data);
        setNewDesignation('');
        setNewAbbreviation('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add designation.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting a designation
  const handleDeleteDesignation = async (designation) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/designations', {
        data: {
          officeType: selectedOfficeType,
          designation,
        },
      });
      setDesignations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete designation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Designations</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Designations</h2>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              disabled={loading}
            >
              View Data
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!selectedOfficeType || loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="mb-4">
          <label htmlFor="officeType" className="text-sm font-semibold text-gray-700 mb-2 block">
            Office Type
          </label>
          <select
            id="officeType"
            value={selectedOfficeType}
            onChange={handleOfficeTypeChange}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={loading}
          >
            <option value="">Nothing Selected</option>
            {officeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Office Type</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {designations.length > 0 ? (
                designations.map((designation, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 2}</td>
                    <td className="border px-4 py-2 text-center">{selectedOfficeType}</td>
                    <td className="border px-4 py-2 text-center">{designation.designation}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteDesignation(designation.designation)}
                        className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                        disabled={loading}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                    No designations available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing {designations.length > 0 ? 1 : 0} to {designations.length} of {designations.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-200 disabled:bg-gray-100"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 border rounded bg-gray-200">1</button>
            <button
              className="px-4 py-2 border rounded hover:bg-gray-200 disabled:bg-gray-100"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Designations</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newDesignation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Designation
              </label>
              <input
                id="newDesignation"
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter designation"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newAbbreviation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Abbreviation
              </label>
              <input
                id="newAbbreviation"
                type="text"
                value={newAbbreviation}
                onChange={(e) => setNewAbbreviation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter abbreviation (optional)"
                disabled={loading}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200 disabled:bg-gray-100"
                disabled={loading}
              >
                Close
              </button>
              <button
                onClick={handleAddDesignation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
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

export default Designations;