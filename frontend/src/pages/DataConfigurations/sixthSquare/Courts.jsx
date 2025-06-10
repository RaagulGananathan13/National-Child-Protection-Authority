import React, { useState } from 'react';
import Navbar from '../../../components/Navbar'; // Same Navbar component as in other pages

const Courts = () => {
  // Sample data for provinces, districts, court types, and courts
  const initialData = {
    Eastern: {
      Ampara: {
        'High Court': [
          { name: 'High Court, Balapitiya', district: 'Ampara' },
          { name: 'High Court, Galle', district: 'Ampara' },
        ],
        'Magistrate Court': [],
      },
      Batticaloa: {
        'High Court': [],
        'Magistrate Court': [],
      },
      Trincomalee: {
        'High Court': [],
        'Magistrate Court': [],
      },
    },
    Western: {
      Colombo: {
        'High Court': [],
        'Magistrate Court': [],
      },
      Gampaha: {
        'High Court': [],
        'Magistrate Court': [],
      },
      Kalutara: {
        'High Court': [],
        'Magistrate Court': [],
      },
    },
    Southern: {
      Galle: {
        'High Court': [],
        'Magistrate Court': [],
      },
      Matara: {
        'High Court': [],
        'Magistrate Court': [],
      },
      Hambantota: {
        'High Court': [],
        'Magistrate Court': [],
      },
    },
  };

  // State for selected province, district, court type, courts, and modal
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCourtType, setSelectedCourtType] = useState('');
  const [courts, setCourts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourtName, setNewCourtName] = useState('');

  // Provinces, districts, and court types for dropdowns
  const provinces = ['Eastern', 'Western', 'Southern'];
  const districtsByProvince = {
    Eastern: ['Ampara', 'Batticaloa', 'Trincomalee'],
    Western: ['Colombo', 'Gampaha', 'Kalutara'],
    Southern: ['Galle', 'Matara', 'Hambantota'],
  };
  const courtTypes = ['High Court', 'Magistrate Court'];

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict(''); // Reset district when province changes
    setSelectedCourtType(''); // Reset court type when province changes
    setCourts([]); // Reset courts
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCourtType(''); // Reset court type when district changes
    setCourts([]); // Reset courts
  };

  // Handle court type selection
  const handleCourtTypeChange = (e) => {
    const courtType = e.target.value;
    setSelectedCourtType(courtType);
    if (selectedProvince && selectedDistrict && courtType) {
      setCourts(initialData[selectedProvince][selectedDistrict][courtType] || []);
    } else {
      setCourts([]);
    }
  };

  // Handle adding a new court
  const handleAddCourt = () => {
    if (newCourtName && selectedProvince && selectedDistrict && selectedCourtType) {
      const newCourt = { name: newCourtName, district: selectedDistrict };
      const updatedCourts = [...courts, newCourt];
      setCourts(updatedCourts);
      initialData[selectedProvince][selectedDistrict][selectedCourtType] = updatedCourts; // Update the data source
      setNewCourtName('');
      setIsModalOpen(false);
    }
  };

  // Handle deleting a court
  const handleDeleteCourt = (courtName) => {
    const updatedCourts = courts.filter((court) => court.name !== courtName);
    setCourts(updatedCourts);
    initialData[selectedProvince][selectedDistrict][selectedCourtType] = updatedCourts; // Update the data source
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
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Courts</h1>

      {/* Main Content Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        {/* Header with Title and Buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Courts</h2>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View Data
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!selectedProvince || !selectedDistrict || !selectedCourtType} // Disable if no selections
            >
              Add Data
            </button>
          </div>
        </div>

        {/* Dropdowns for Province, District, and Court Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="province" className="text-sm font-semibold text-gray-700 mb-2">
              Province
            </label>
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="district" className="text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedProvince} // Disable if no province is selected
            >
              <option value="">Select District</option>
              {selectedProvince &&
                districtsByProvince[selectedProvince].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="courtType" className="text-sm font-semibold text-gray-700 mb-2">
              Court Type
            </label>
            <select
              id="courtType"
              value={selectedCourtType}
              onChange={handleCourtTypeChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedDistrict} // Disable if no district is selected
            >
              <option value="">Select Court Type</option>
              {courtTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Index</th>
                <th className="border px-4 py-2">Court Name</th>
                <th className="border px-4 py-2">District</th>
                <th className="border px-4 py-2">Court Type</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courts.length > 0 ? (
                courts.map((court, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 14}</td>
                    <td className="border px-4 py-2 text-center">{court.name}</td>
                    <td className="border px-4 py-2 text-center">{court.district}</td>
                    <td className="border px-4 py-2 text-center">{selectedCourtType}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteCourt(court.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
                    No courts available for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {courts.length} of {courts.length} entries
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

      {/* Modal for Adding New Court */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Court</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newCourtName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Court
              </label>
              <input
                id="newCourtName"
                type="text"
                value={newCourtName}
                onChange={(e) => setNewCourtName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter court name"
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
                onClick={handleAddCourt}
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

export default Courts;