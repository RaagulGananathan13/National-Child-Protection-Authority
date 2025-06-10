import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per previous pattern, but not used for rendering)
const initialSchoolTypes = [
  'Government Boys School',
  'Government Girls School',
  'Government Mixed School',
  'Government Girls School with boys in primary or A/L',
  'Government Boys School with girls in primary or A/L',
];

const SchoolTypes = () => {
  // State for school types, modal, loading, and error
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchoolType, setNewSchoolType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch school types on component mount
  useEffect(() => {
    const fetchSchoolTypes = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/school-types');
        setSchoolTypes(response.data);
      } catch (err) {
        setError('Failed to load school types. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolTypes();
  }, []);

  // Handle adding a new school type
  const handleAddSchoolType = async () => {
    if (!newSchoolType.trim()) {
      setError('School type name cannot be empty.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/school-types', {
        name: newSchoolType.trim(),
      });
      setSchoolTypes(response.data);
      setNewSchoolType('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add school type.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a school type
  const handleDeleteSchoolType = async (schoolType) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/school-types', {
        data: { name: schoolType },
      });
      setSchoolTypes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete school type.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">School Types</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">School Types</h2>
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
              disabled={loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">School Type</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {schoolTypes.length > 0 ? (
                schoolTypes.map((schoolType, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{schoolType}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteSchoolType(schoolType)}
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
                  <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                    No school types available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {schoolTypes.length} of {schoolTypes.length} entries
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
              <h2 className="text-xl font-bold">Add New School Type</h2>
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
                htmlFor="newSchoolType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                School Type
              </label>
              <input
                id="newSchoolType"
                type="text"
                value={newSchoolType}
                onChange={(e) => setNewSchoolType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter school type"
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
                onClick={handleAddSchoolType}
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

export default SchoolTypes;