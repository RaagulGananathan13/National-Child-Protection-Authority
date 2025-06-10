import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per previous pattern, but not used for rendering)
const initialData = {
  EASTERN: {
    Batticaloa: {
      'Government Boys School': [
        { name: 'St. Michael’s College', address: 'Batticaloa, Eastern Province' },
        { name: 'Vincent Girls’ High School', address: 'Batticaloa, Eastern Province' },
      ],
      'Government Girls School': [
        { name: 'Methodist Central College', address: 'Batticaloa, Eastern Province' },
      ],
    },
    Ampara: {
      'Government Boys School': [
        { name: 'D.S. Senanayake College', address: 'Ampara, Eastern Province' },
      ],
      'Government Girls School': [
        { name: 'Zahira College', address: 'Ampara, Eastern Province' },
      ],
    },
  },
  CENTRAL: {
    Kandy: {
      'Government Boys School': [
        { name: 'Kingswood College', address: 'Kandy, Central Province' },
        { name: 'Dharmaraja College', address: 'Kandy, Central Province' },
      ],
      'Government Girls School': [
        { name: 'Girls’ High School', address: 'Kandy, Central Province' },
      ],
    },
    Denuwara: {
      'Government Boys School': [
        { name: 'AS - Siraj Boys School', address: 'Denuwara, Central Province' },
      ],
      'Government Girls School': [
        { name: 'Denuwara Central College', address: 'Denuwara, Central Province' },
      ],
    },
  },
  NORTHERN: {
    Jaffna: {
      'Government Boys School': [
        { name: 'Jaffna Hindu College', address: 'Jaffna, Northern Province' },
      ],
      'Government Girls School': [
        { name: 'Vembadi Girls’ High School', address: 'Jaffna, Northern Province' },
      ],
    },
    Vavuniya: {
      'Government Boys School': [
        { name: 'Vavuniya Tamil Madhya Maha Vidyalayam', address: 'Vavuniya, Northern Province' },
      ],
      'Government Girls School': [
        { name: 'Rambaikulam Girls’ Maha Vidyalayam', address: 'Vavuniya, Northern Province' },
      ],
    },
  },
  SOUTHERN: {
    Galle: {
      'Government Boys School': [
        { name: 'Richmond College', address: 'Galle, Southern Province' },
      ],
      'Government Girls School': [
        { name: 'Southlands College', address: 'Galle, Southern Province' },
      ],
    },
    Matara: {
      'Government Boys School': [
        { name: 'Rahula College', address: 'Matara, Southern Province' },
      ],
      'Government Girls School': [
        { name: 'Sujatha Vidyalaya', address: 'Matara, Southern Province' },
      ],
    },
  },
  WESTERN: {
    Colombo: {
      'Government Boys School': [
        { name: 'Royal College', address: 'Colombo, Western Province' },
        { name: 'Ananda College', address: 'Colombo, Western Province' },
      ],
      'Government Girls School': [
        { name: 'Visakha Vidyalaya', address: 'Colombo, Western Province' },
      ],
    },
    Gampaha: {
      'Government Boys School': [
        { name: 'Bandaranayake College', address: 'Gampaha, Western Province' },
      ],
      'Government Girls School': [
        { name: 'Rathnavali Balika Vidyalaya', address: 'Gampaha, Western Province' },
      ],
    },
  },
};

const Schools = () => {
  // State for dropdowns, schools, modal, loading, and error
  const [provinces, setProvinces] = useState([]);
  const [educationZones, setEducationZones] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedEducationZone, setSelectedEducationZone] = useState('');
  const [selectedSchoolType, setSelectedSchoolType] = useState('');
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolAddress, setNewSchoolAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch provinces and education zones from Back4App and school types from MongoDB on mount
  useEffect(() => {
    const fetchBack4AppData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          'https://parseapi.back4app.com/classes/LK?limit=100000000000000000000&keys=adminName1,adminName2,placeName',
          {
            headers: {
              'X-Parse-Application-Id': 'zS2XAEVEZAkD081UmEECFq22mAjIvX2IlTYaQfai',
              'X-Parse-Master-Key': 't6EjVCUOwutr1ruorlXNsH3Rz65g0jiVtbILtAYU',
            },
          }
        );
        const data = response.data.results;
        // Extract unique provinces (adminName1)
        const uniqueProvinces = [...new Set(data.map((item) => item.adminName1))].filter(Boolean).sort();
        uniqueProvinces.unshift('ALL'); // Add ALL option
        setProvinces(uniqueProvinces);
        // Store all data for education zones filtering
        window.back4AppData = data; // Store in global scope for filtering education zones
      } catch (err) {
        setError('Failed to load provinces from Back4App. Please try again later.');
        console.error(err);
      }
    };

    const fetchSchoolTypes = async () => {
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

    fetchBack4AppData();
    fetchSchoolTypes();
  }, []);

  // Update education zones when province changes
  useEffect(() => {
    if (selectedProvince && selectedProvince !== 'ALL' && window.back4AppData) {
      const zones = [...new Set(
        window.back4AppData
          .filter((item) => item.adminName1 === selectedProvince)
          .map((item) => item.adminName2)
      )].filter(Boolean).sort();
      setEducationZones(zones);
    } else {
      setEducationZones([]);
    }
    setSelectedEducationZone('');
    setSelectedSchoolType('');
    setSchools([]);
  }, [selectedProvince]);

  // Fetch schools when province, education zone, and school type are selected
  useEffect(() => {
    if (selectedProvince && selectedProvince !== 'ALL' && selectedEducationZone && selectedSchoolType) {
      const fetchSchools = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/schools', {
            params: { province: selectedProvince, educationZone: selectedEducationZone, schoolType: selectedSchoolType },
          });
          setSchools(response.data);
        } catch (err) {
          setError('Failed to load schools. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSchools();
    } else {
      setSchools([]);
    }
  }, [selectedProvince, selectedEducationZone, selectedSchoolType]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
  };

  // Handle education zone selection
  const handleEducationZoneChange = (e) => {
    const educationZone = e.target.value;
    setSelectedEducationZone(educationZone);
    setSelectedSchoolType('');
    setSchools([]);
  };

  // Handle school type selection
  const handleSchoolTypeChange = (e) => {
    const schoolType = e.target.value;
    setSelectedSchoolType(schoolType);
  };

  // Handle adding a new school
  const handleAddSchool = async () => {
    if (!newSchoolName.trim() || !newSchoolAddress.trim()) {
      setError('School name and address cannot be empty.');
      return;
    }
    if (selectedProvince && selectedProvince !== 'ALL' && selectedEducationZone && selectedSchoolType) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/schools', {
          province: selectedProvince,
          educationZone: selectedEducationZone,
          schoolType: selectedSchoolType,
          name: newSchoolName.trim(),
          address: newSchoolAddress.trim(),
        });
        setSchools(response.data);
        setNewSchoolName('');
        setNewSchoolAddress('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add school.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting a school
  const handleDeleteSchool = async (schoolName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/schools', {
        data: {
          province: selectedProvince,
          educationZone: selectedEducationZone,
          schoolType: selectedSchoolType,
          name: schoolName,
        },
      });
      setSchools(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete school.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Schools</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Schools</h2>
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
              disabled={!selectedProvince || selectedProvince === 'ALL' || !selectedEducationZone || !selectedSchoolType || loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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

          <div className="flex flex-col">
            <label htmlFor="educationZone" className="text-sm font-semibold text-gray-700 mb-2">
              Education Zone
            </label>
            <select
              id="educationZone"
              value={selectedEducationZone}
              onChange={handleEducationZoneChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedProvince || selectedProvince === 'ALL' || loading}
            >
              <option value="">Nothing Selected</option>
              {educationZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="schoolType" className="text-sm font-semibold text-gray-700 mb-2">
              School Type
            </label>
            <select
              id="schoolType"
              value={selectedSchoolType}
              onChange={handleSchoolTypeChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedEducationZone || loading}
            >
              <option value="">Nothing Selected</option>
              {schoolTypes.map((type) => (
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
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Province</th>
                <th className="border px-4 py-2">Education Zone</th>
                <th className="border px-4 py-2">School</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {schools.length > 0 ? (
                schools.map((school, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{44977 + index}</td>
                    <td className="border px-4 py-2 text-center">{selectedProvince}</td>
                    <td className="border px-4 py-2 text-center">{selectedEducationZone}</td>
                    <td className="border px-4 py-2 text-center">{school.name}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteSchool(school.name)}
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
                    No schools available for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {schools.length} of {schools.length} entries
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
              <h2 className="text-xl font-bold">Add New School</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="newSchoolName" className="block text-sm font-semibold text-gray-700 mb-2">
                School
              </label>
              <input
                id="newSchoolName"
                type="text"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter school name"
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newSchoolAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                id="newSchoolAddress"
                type="text"
                value={newSchoolAddress}
                onChange={(e) => setNewSchoolAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter school address"
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
                onClick={handleAddSchool}
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

export default Schools;