import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per previous pattern, but not used for rendering)
const initialData = {
  'ALL': [],
  'Complaint Request': [
    { code: 'CY', origin: 'CYBER SURVEILLANCE' },
    { code: 'SM', origin: 'SOCIAL MEDIA' },
    { code: 'CC', origin: 'CALL CENTRE' },
  ],
  'Police Complaint': [],
  'Vedio Evidence': [],
  'Vulnerable Child': [],
};

const MediumsOfComplaints = () => {
  // State for selected request type, mediums, modal, loading, and error
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [mediums, setMediums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrigin, setNewOrigin] = useState('');
  const [newCode, setNewCode] = useState('');
  const [modalRequestType, setModalRequestType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Request types for dropdown
  const requestTypes = [
    'ALL',
    'Complaint Request',
    'Police Complaint',
    'Vedio Evidence',
    'Vulnerable Child',
  ];

  // Fetch mediums when request type changes
  useEffect(() => {
    const fetchMediums = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/mediums', {
          params: { requestType: selectedRequestType },
        });
        setMediums(response.data);
      } catch (err) {
        setError('Failed to load mediums. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRequestType) {
      fetchMediums();
    } else {
      setMediums([]);
    }
  }, [selectedRequestType]);

  // Handle request type selection
  const handleRequestTypeChange = (e) => {
    const requestType = e.target.value;
    setSelectedRequestType(requestType);
  };

  // Handle adding a new medium of complaint
  const handleAddMedium = async () => {
    if (!newOrigin.trim() || !newCode.trim() || !modalRequestType) {
      setError('Origin, code, and request type are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/mediums', {
        requestType: modalRequestType,
        code: newCode.trim(),
        origin: newOrigin.trim(),
      });
      if (selectedRequestType === modalRequestType || selectedRequestType === 'ALL') {
        setMediums(response.data);
      }
      setNewOrigin('');
      setNewCode('');
      setModalRequestType('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add medium.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a medium of complaint
  const handleDeleteMedium = async (codeToDelete) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/mediums', {
        data: { requestType: selectedRequestType, code: codeToDelete },
      });
      setMediums(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete medium.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Origin Of Complaints</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Origin Of Complaints</h2>
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

        <div className="mb-4">
          <label htmlFor="requestType" className="text-sm font-semibold text-gray-700 mb-2 block">
            Request Type
          </label>
          <select
            id="requestType"
            value={selectedRequestType}
            onChange={handleRequestTypeChange}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={loading}
          >
            <option value="">Nothing Selected</option>
            {requestTypes.map((type) => (
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
                <th className="border px-4 py-2">Code</th>
                <th className="border px-4 py-2">Origin</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {mediums.length > 0 ? (
                mediums.map((medium, index) => (
                  <tr key={medium.code} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">
                      {selectedRequestType === 'Complaint Request' ? index + 1 : index + 2}
                    </td>
                    <td className="border px-4 py-2 text-center">{medium.code}</td>
                    <td className="border px-4 py-2 text-center">{medium.origin}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteMedium(medium.code)}
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
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing {mediums.length > 0 ? 1 : 0} to {mediums.length} of {mediums.length} entries
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
              <h2 className="text-xl font-bold">Add New Origin Of Complaints</h2>
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
                htmlFor="newOrigin"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Origin Of Complaints
              </label>
              <input
                id="newOrigin"
                type="text"
                value={newOrigin}
                onChange={(e) => setNewOrigin(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter origin of complaint"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newCode"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Code
              </label>
              <input
                id="newCode"
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter code"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="modalRequestType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Request Type
              </label>
              <select
                id="modalRequestType"
                value={modalRequestType}
                onChange={(e) => setModalRequestType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                disabled={loading}
              >
                <option value="">Nothing Selected</option>
                {requestTypes
                  .filter((type) => type !== 'ALL')
                  .map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
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
                onClick={handleAddMedium}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={!newOrigin || !newCode || !modalRequestType || loading}
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

export default MediumsOfComplaints;