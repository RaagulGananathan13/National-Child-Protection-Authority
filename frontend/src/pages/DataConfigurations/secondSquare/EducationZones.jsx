import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

const EducationZones = () => {
  // State for selected province, education zones, modal, loading, and error
  const [selectedProvince, setSelectedProvince] = useState('');
  const [educationZones, setEducationZones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEducationZone, setNewEducationZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Provinces for dropdown
  const provinces = [
    'ALL',
    'CENTRAL',
    'EASTERN',
    'NORTHCENTRAL',
    'NORTHERN',
    'NORTHWESTERN',
    'SABARAGAMUWA',
    'SOUTHERN',
    'UNKNOWN',
    'UVA',
    'WESTERN',
  ];

  // Fetch education zones when province changes
  useEffect(() => {
    if (selectedProvince && selectedProvince !== 'ALL') {
      const fetchEducationZones = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/education-zones', {
            params: { province: selectedProvince },
          });
          setEducationZones(response.data);
        } catch (err) {
          setError('Failed to load education zones. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchEducationZones();
    } else {
      setEducationZones([]);
    }
  }, [selectedProvince]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
  };

  // Handle adding a new education zone
  const handleAddEducationZone = async () => {
    if (!newEducationZone.trim()) {
      setError('Education zone name cannot be empty.');
      return;
    }
    if (selectedProvince && selectedProvince !== 'ALL') {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/education-zones', {
          province: selectedProvince,
          educationZone: newEducationZone.trim(),
        });
        setEducationZones(response.data);
        setNewEducationZone('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add education zone.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting an education zone
  const handleDeleteEducationZone = async (educationZone) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/education-zones', {
        data: {
          province: selectedProvince,
          educationZone,
        },
      });
      setEducationZones(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete education zone.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Education Zones</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Education Zones</h2>
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
              disabled={!selectedProvince || selectedProvince === 'ALL' || loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="province" className="text-sm font-semibold text-gray-700 mb-2">
              Province
            </label>
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={loading}
            >
              <option value="">Nothing Selected</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Province</th>
                <th className="border px-4 py-2">Education Zone</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {educationZones.length > 0 ? (
                educationZones.map((educationZone, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{456 + index}</td>
                    <td className="border px-4 py-2 text-center">{selectedProvince}</td>
                    <td className="border px-4 py-2 text-center">{educationZone}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteEducationZone(educationZone)}
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
                    No education zones available for this province.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {educationZones.length} of {educationZones.length} entries
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
              <h2 className="text-xl font-bold">Add New Education Zone</h2>
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
                htmlFor="newEducationZone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Education Zone
              </label>
              <input
                id="newEducationZone"
                type="text"
                value={newEducationZone}
                onChange={(e) => setNewEducationZone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter education zone name"
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
                onClick={handleAddEducationZone}
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

export default EducationZones;