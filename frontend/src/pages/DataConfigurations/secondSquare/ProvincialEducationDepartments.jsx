import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as requested, but not used for rendering)
const initialDepartments = [
  {
    name: 'Central Provincial Education Department',
    address: 'No. 123, Kandy Road, Kandy, Central Province',
    telephone: '081-222-3333',
  },
  {
    name: 'Eastern Provincial Education Department',
    address: 'No. 456, Main Street, Batticaloa, Eastern Province',
    telephone: '065-222-4444',
  },
  {
    name: 'Northern Provincial Education Department',
    address: 'No. 789, Jaffna Road, Jaffna, Northern Province',
    telephone: '021-222-5555',
  },
  {
    name: 'Southern Provincial Education Department',
    address: 'No. 101, Galle Road, Galle, Southern Province',
    telephone: '091-222-6666',
  },
  {
    name: 'Western Provincial Education Department',
    address: 'No. 202, High Level Road, Colombo, Western Province',
    telephone: '011-222-7777',
  },
];

const ProvincialEducationDepartments = () => {
  // State for departments, modal, loading, and error
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentAddress, setNewDepartmentAddress] = useState('');
  const [newDepartmentTelephone, setNewDepartmentTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/provincial-education-departments');
        setDepartments(response.data);
      } catch (err) {
        setError('Failed to load departments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Handle adding a new department
  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim() || !newDepartmentAddress.trim() || !newDepartmentTelephone.trim()) {
      setError('Name, address, and telephone are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/provincial-education-departments', {
        name: newDepartmentName.trim(),
        address: newDepartmentAddress.trim(),
        telephone: newDepartmentTelephone.trim(),
      });
      setDepartments(response.data);
      setNewDepartmentName('');
      setNewDepartmentAddress('');
      setNewDepartmentTelephone('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add department.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a department
  const handleDeleteDepartment = async (departmentName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/provincial-education-departments', {
        data: { name: departmentName },
      });
      setDepartments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete department.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Provincial Education Departments</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Provincial Education Departments</h2>
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
                <th className="border px-4 py-2">Provincial Education Department</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Telephone</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((department, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{department.name}</td>
                    <td className="border px-4 py-2 text-center">{department.address}</td>
                    <td className="border px-4 py-2 text-center">{department.telephone}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteDepartment(department.name)}
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
                  <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
                    No provincial education departments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {departments.length} of {departments.length} entries
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
              <h2 className="text-xl font-bold">Add New Provincial Education Department</h2>
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
                htmlFor="newDepartmentName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Provincial Education Department
              </label>
              <input
                id="newDepartmentName"
                type="text"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter department name"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newDepartmentAddress"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                id="newDepartmentAddress"
                type="text"
                value={newDepartmentAddress}
                onChange={(e) => setNewDepartmentAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter address"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newDepartmentTelephone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                id="newDepartmentTelephone"
                type="text"
                value={newDepartmentTelephone}
                onChange={(e) => setNewDepartmentTelephone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter telephone number"
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
                onClick={handleAddDepartment}
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

export default ProvincialEducationDepartments;