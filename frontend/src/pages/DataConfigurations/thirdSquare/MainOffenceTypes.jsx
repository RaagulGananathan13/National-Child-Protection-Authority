import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as requested, but not used for rendering)
const initialData = {
  COMPLAINT_REQUEST: {
    'CA 01 - Penal code offence': ['Theft', 'Assault', 'Fraud'],
    'CA 02 - Employment of Women, young person or children': ['Child Labor', 'Exploitation'],
    'CA 03 - Care and Protection': ['Neglect', 'Abuse'],
    'CA 04 - Compulsory education': ['Truancy', 'Dropout'],
    'CA 05 - Other laws and Miscellaneous': ['Vandalism', 'Trespassing'],
  },
  POLICE_COMPLAINT_REQUEST: {
    'CA 01 - Penal code offence': ['Robbery', 'Burglary'],
    'CA 02 - Employment of Women, young person or children': ['Forced Labor'],
    'CA 03 - Care and Protection': ['Domestic Violence'],
    'CA 04 - Compulsory education': ['School Avoidance'],
    'CA 05 - Other laws and Miscellaneous': ['Public Nuisance'],
  },
  VEDIO_EVIDENCE_REQUEST: {
    'CA 01 - Penal code offence': ['Cybercrime', 'Harassment'],
    'CA 02 - Employment of Women, young person or children': ['Online Exploitation'],
    'CA 03 - Care and Protection': ['Online Bullying'],
    'CA 04 - Compulsory education': ['Virtual Truancy'],
    'CA 05 - Other laws and Miscellaneous': ['Digital Fraud'],
  },
  VULNERABLE_CHILDREN_REQUEST: {
    'CA 01 - Penal code offence': ['Kidnapping', 'Trafficking'],
    'CA 02 - Employment of Women, young person or children': ['Child Labor in Hazardous Conditions'],
    'CA 03 - Care and Protection': ['Abandonment'],
    'CA 04 - Compulsory education': ['Educational Neglect'],
    'CA 05 - Other laws and Miscellaneous': ['Child Begging'],
  },
};

const MainOffenceTypes = () => {
  // State for selections, main offence types, modal, loading, and error
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [selectedBasicType, setSelectedBasicType] = useState('');
  const [mainOffenceTypes, setMainOffenceTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMainOffenceType, setNewMainOffenceType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Request types and basic offence types for dropdowns
  const requestTypes = [
    'COMPLAINT_REQUEST',
    'POLICE_COMPLAINT_REQUEST',
    'VEDIO_EVIDENCE_REQUEST',
    'VULNERABLE_CHILDREN_REQUEST',
  ];

  const basicTypes = [
    'CA 01 - Penal code offence',
    'CA 02 - Employment of Women, young person or children',
    'CA 03 - Care and Protection',
    'CA 04 - Compulsory education',
    'CA 05 - Other laws and Miscellaneous',
  ];

  // Fetch main offence types when request type or basic type changes
  useEffect(() => {
    if (selectedRequestType && selectedBasicType) {
      const fetchMainOffenceTypes = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/main-offence-types', {
            params: { requestType: selectedRequestType, basicType: selectedBasicType },
          });
          setMainOffenceTypes(response.data);
        } catch (err) {
          setError('Failed to load main offence types. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchMainOffenceTypes();
    } else {
      setMainOffenceTypes([]);
    }
  }, [selectedRequestType, selectedBasicType]);

  // Handle request type selection
  const handleRequestTypeChange = (e) => {
    const requestType = e.target.value;
    setSelectedRequestType(requestType);
    setSelectedBasicType(''); // Reset basic type
    setMainOffenceTypes([]); // Reset main offence types
  };

  // Handle basic offence type selection
  const handleBasicTypeChange = (e) => {
    const basicType = e.target.value;
    setSelectedBasicType(basicType);
  };

  // Handle adding a new main offence type
  const handleAddMainOffenceType = async () => {
    if (!newMainOffenceType.trim()) {
      setError('Main offence type name cannot be empty.');
      return;
    }
    if (selectedRequestType && selectedBasicType) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/main-offence-types', {
          requestType: selectedRequestType,
          basicType: selectedBasicType,
          mainOffenceType: newMainOffenceType.trim(),
        });
        setMainOffenceTypes(response.data);
        setNewMainOffenceType('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add main offence type.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting a main offence type
  const handleDeleteMainOffenceType = async (mainOffenceType) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/main-offence-types', {
        data: {
          requestType: selectedRequestType,
          basicType: selectedBasicType,
          mainOffenceType,
        },
      });
      setMainOffenceTypes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete main offence type.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Main Offence Types</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Main Offence Types</h2>
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
              disabled={!selectedRequestType || !selectedBasicType || loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="requestType" className="text-sm font-semibold text-gray-700 mb-2">
              Request Type
            </label>
            <select
              id="requestType"
              value={selectedRequestType}
              onChange={handleRequestTypeChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
          <div className="flex flex-col">
            <label htmlFor="basicType" className="text-sm font-semibold text-gray-700 mb-2">
              Basic Type
            </label>
            <select
              id="basicType"
              value={selectedBasicType}
              onChange={handleBasicTypeChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedRequestType || loading}
            >
              <option value="">Nothing Selected</option>
              {basicTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Request Type</th>
                <th className="border px-4 py-2">Basic Type</th>
                <th className="border px-4 py-2">Main Type</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {mainOffenceTypes.length > 0 ? (
                mainOffenceTypes.map((mainType, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 27}</td>
                    <td className="border px-4 py-2 text-center">{selectedRequestType}</td>
                    <td className="border px-4 py-2 text-center">{selectedBasicType}</td>
                    <td className="border px-4 py-2 text-center">{mainType}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteMainOffenceType(mainType)}
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
                    No main offence types available for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {mainOffenceTypes.length} of {mainOffenceTypes.length} entries
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
              <h2 className="text-xl font-bold">Add New Type</h2>
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
                htmlFor="newMainOffenceType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Main Type
              </label>
              <input
                id="newMainOffenceType"
                type="text"
                value={newMainOffenceType}
                onChange={(e) => setNewMainOffenceType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter main offence type"
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
                onClick={handleAddMainOffenceType}
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

export default MainOffenceTypes;