import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Helper function to format province names
const formatProvinceName = (province) => {
  if (province === 'ALL') return province;
  return province
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const DivisionalSecretariats = () => {
  // State for API data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionalSecretariats, setDivisionalSecretariats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for selections and UI
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDivisionalSecretariat, setNewDivisionalSecretariat] = useState('');

  // State for province-district mapping
  const [provinceDistrictMap, setProvinceDistrictMap] = useState({});

  // Fetch provinces and districts from Back4App API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          'https://parseapi.back4app.com/classes/LK?limit=100000000000000000000&keys=adminName1,adminName2',
          {
            headers: {
              'X-Parse-Application-Id': 'zS2XAEVEZAkD081UmEECFq22mAjIvX2IlTYaQfai',
              'X-Parse-Master-Key': 't6EjVCUOwutr1ruorlXNsH3Rz65g0jiVtbILtAYU',
            },
          }
        );

        // Process API data
        const data = response.data.results;
        const provinceMap = {};

        // Normalize province names and map provinces to districts
        data.forEach(({ adminName1, adminName2 }) => {
          if (adminName1 && adminName2) {
            const normalizedProvince = adminName1.trim().toUpperCase();
            if (!provinceMap[normalizedProvince]) {
              provinceMap[normalizedProvince] = { districts: new Set() };
            }
            provinceMap[normalizedProvince].districts.add(adminName2.trim());
          }
        });

        // Convert Sets to sorted arrays
        Object.keys(provinceMap).forEach((province) => {
          provinceMap[province].districts = Array.from(provinceMap[province].districts).sort();
        });

        // Set provinces, including ALL option
        const provinceList = ['ALL', ...Object.keys(provinceMap).sort()];
        setProvinces(provinceList);

        // Store province-district mapping for district lookup
        setProvinceDistrictMap(provinceMap);
      } catch (err) {
        setError('Failed to load provinces and districts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince && selectedProvince !== 'ALL') {
      const newDistricts = provinceDistrictMap[selectedProvince]?.districts || [];
      setDistricts(newDistricts);
      setSelectedDistrict(''); // Reset district
      setDivisionalSecretariats([]); // Reset divisional secretariats
    } else {
      setDistricts([]);
      setSelectedDistrict('');
      setDivisionalSecretariats([]);
    }
  }, [selectedProvince, provinceDistrictMap]);

  // Fetch divisional secretariats when district changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const fetchDivisionalSecretariats = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/divisional-secretariats', {
            params: { province: selectedProvince, district: selectedDistrict },
          });
          setDivisionalSecretariats(response.data);
        } catch (err) {
          setError('Failed to load divisional secretariats. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDivisionalSecretariats();
    } else {
      setDivisionalSecretariats([]);
    }
  }, [selectedProvince, selectedDistrict]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // Handle adding a new divisional secretariat
  const handleAddDivisionalSecretariat = async () => {
    if (!newDivisionalSecretariat.trim()) {
      setError('Divisional secretariat name cannot be empty.');
      return;
    }
    if (selectedProvince && selectedDistrict) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/divisional-secretariats', {
          province: selectedProvince,
          district: selectedDistrict,
          divisionalSecretariat: newDivisionalSecretariat.trim(),
        });
        setDivisionalSecretariats(response.data);
        setNewDivisionalSecretariat('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add divisional secretariat.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting a divisional secretariat
  const handleDeleteDivisionalSecretariat = async (divisionalSecretariat) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/divisional-secretariats', {
        data: { province: selectedProvince, district: selectedDistrict, divisionalSecretariat },
      });
      setDivisionalSecretariats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete divisional secretariat.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Divisional Secretariat Configuration
      </h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Divisional Secretariat Configuration</h2>
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
              disabled={!selectedProvince || !selectedDistrict || loading}
            >
              Add Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                  {province === 'WESTERN' ? 'Western Province' : formatProvinceName(province)}
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedProvince || selectedProvince === 'ALL' || loading}
            >
              <option value="">Nothing Selected</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
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
                <th className="border px-4 py-2">District</th>
                <th className="border px-4 py-2">Divisional Secretariat</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {divisionalSecretariats.length > 0 ? (
                divisionalSecretariats.map((divisionalSecretariat, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 5}</td>
                    <td className="border px-4 py-2 text-center">{selectedDistrict}</td>
                    <td className="border px-4 py-2 text-center">{divisionalSecretariat}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteDivisionalSecretariat(divisionalSecretariat)}
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
                    No divisional secretariats available for this district.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {divisionalSecretariats.length} of {divisionalSecretariats.length} entries
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
              <h2 className="text-xl font-bold">Add New Divisional Secretariat</h2>
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
                htmlFor="newDivisionalSecretariat"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Divisional Secretariat
              </label>
              <input
                id="newDivisionalSecretariat"
                type="text"
                value={newDivisionalSecretariat}
                onChange={(e) => setNewDivisionalSecretariat(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter divisional secretariat name"
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
                onClick={handleAddDivisionalSecretariat}
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

export default DivisionalSecretariats;