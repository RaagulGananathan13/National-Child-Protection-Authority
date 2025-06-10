import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per previous pattern, but not used for rendering)
const initialData = {
  Vulnerable: [],
  'At Risk Child': [
    'Child lives in Urban slum',
    'Child lives in Urban estates',
    'Child has been abused in the past',
    'child is connected to a child delinquency',
  ],
  Marginalize: [],
  Visible: [],
};

const VulnerabilitiesConfigurePage = () => {
  // State for categories, modal, loading, and error
  const [categories, setCategories] = useState({
    Vulnerable: [],
    'At Risk Child': [],
    Marginalize: [],
    Visible: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubType, setNewSubType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch sub-types for all categories on component mount
  useEffect(() => {
    const fetchVulnerabilities = async () => {
      setLoading(true);
      setError('');
      try {
        const categoryPromises = Object.keys(categories).map(async (category) => {
          const response = await axios.get('http://localhost:5000/api/vulnerabilities', {
            params: { category },
          });
          return { category, subTypes: response.data };
        });
        const results = await Promise.all(categoryPromises);
        const updatedCategories = {};
        results.forEach(({ category, subTypes }) => {
          updatedCategories[category] = subTypes;
        });
        setCategories(updatedCategories);
      } catch (err) {
        setError('Failed to load vulnerabilities. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVulnerabilities();
  }, []);

  // Handle opening the modal for adding a new sub-type
  const handleAddSubType = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Handle saving a new sub-type
  const handleSaveSubType = async () => {
    if (!newSubType.trim() || !selectedCategory) {
      setError('Sub-type and category are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/vulnerabilities', {
        category: selectedCategory,
        subType: newSubType.trim(),
      });
      setCategories((prev) => ({
        ...prev,
        [selectedCategory]: response.data,
      }));
      setNewSubType('');
      setIsModalOpen(false);
      setSelectedCategory('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add sub-type.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a sub-type
  const handleDeleteSubType = async (category, subType) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/vulnerabilities', {
        data: { category, subType },
      });
      setCategories((prev) => ({
        ...prev,
        [category]: response.data,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete sub-type.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Render a table for each category
  const renderCategoryTable = (category) => {
    const subTypes = categories[category] || [];
    return (
      <div key={category} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{category}</h2>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
              disabled={loading}
            >
              View Data
            </button>
            <button
              onClick={() => handleAddSubType(category)}
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
                <th className="border px-4 py-2">Sub Type</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {subTypes.length > 0 ? (
                subTypes.map((subType, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{subType}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteSubType(category, subType)}
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
                    No sub-types available for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Vulnerabilities Configuration</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        {Object.keys(categories).map((category) => renderCategoryTable(category))}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {selectedCategory === 'At Risk Child'
                    ? 'Add Risk Child Category'
                    : `Add ${selectedCategory} Category`}
                </h2>
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
                  htmlFor="newSubType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {selectedCategory === 'At Risk Child' ? 'Risk Child Category' : `${selectedCategory} Category`}
                </label>
                <input
                  id="newSubType"
                  type="text"
                  value={newSubType}
                  onChange={(e) => setNewSubType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder={`Enter ${selectedCategory.toLowerCase()} sub-type`}
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
                  onClick={handleSaveSubType}
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
    </div>
  );
};

export default VulnerabilitiesConfigurePage;