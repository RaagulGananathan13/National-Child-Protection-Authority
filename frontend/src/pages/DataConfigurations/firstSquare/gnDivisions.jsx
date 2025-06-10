import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Helper function to format province names
const formatProvinceName = (province) => {
  if (province === 'ALL') return province;
  return province
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const GNDivisions = () => {
  // State for API data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionalSecretariats, setDivisionalSecretariats] = useState([]);
  const [gnDivisions, setGNDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for selections and UI
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDivisionalSecretariat, setSelectedDivisionalSecretariat] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGNDivision, setNewGNDivision] = useState('');

  // State for mappings
  const [provinceDistrictMap, setProvinceDistrictMap] = useState({});
  const [districtDivisionalSecretariatMap, setDistrictDivisionalSecretariatMap] = useState({});

  // Fetch provinces, districts, and divisional secretariats from Back4App API
  useEffect(() => {
    const fetchData = async () => {
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

        // Process API data
        const data = response.data.results;
        const provinceMap = {};
        const divisionalSecretariatMap = {};

        // Normalize and map provinces to districts and districts to divisional secretariats
        data.forEach(({ adminName1, adminName2, placeName }) => {
          if (adminName1 && adminName2 && placeName) {
            const normalizedProvince = adminName1.trim().toUpperCase();
            const normalizedDistrict = adminName2.trim();
            const normalizedPlaceName = placeName.trim();

            // Province to district mapping
            if (!provinceMap[normalizedProvince]) {
              provinceMap[normalizedProvince] = { districts: new Set() };
            }
            provinceMap[normalizedProvince].districts.add(normalizedDistrict);

            // District to divisional secretariat mapping
            const districtKey = `${normalizedProvince}:${normalizedDistrict}`;
            if (!divisionalSecretariatMap[districtKey]) {
              divisionalSecretariatMap[districtKey] = { divisionalSecretariats: new Set() };
            }
            divisionalSecretariatMap[districtKey].divisionalSecretariats.add(normalizedPlaceName);
          }
        });

        // Convert Sets to sorted arrays
        Object.keys(provinceMap).forEach((province) => {
          provinceMap[province].districts = Array.from(provinceMap[province].districts).sort();
        });
        Object.keys(divisionalSecretariatMap).forEach((districtKey) => {
          divisionalSecretariatMap[districtKey].divisionalSecretariats = Array.from(
            divisionalSecretariatMap[districtKey].divisionalSecretariats
          ).sort();
        });

        // Set provinces, including ALL option
        const provinceList = ['ALL', ...Object.keys(provinceMap).sort()];
        setProvinces(provinceList);

        // Store mappings
        setProvinceDistrictMap(provinceMap);
        setDistrictDivisionalSecretariatMap(divisionalSecretariatMap);
      } catch (err) {
        setError('Failed to load provinces, districts, or divisional secretariats. Please try again later.');
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
      setSelectedDistrict('');
      setDivisionalSecretariats([]);
      setSelectedDivisionalSecretariat('');
      setGNDivisions([]);
    } else {
      setDistricts([]);
      setSelectedDistrict('');
      setDivisionalSecretariats([]);
      setSelectedDivisionalSecretariat('');
      setGNDivisions([]);
    }
  }, [selectedProvince, provinceDistrictMap]);

  // Update divisional secretariats when district changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      const districtKey = `${selectedProvince}:${selectedDistrict}`;
      const newDivisionalSecretariats =
        districtDivisionalSecretariatMap[districtKey]?.divisionalSecretariats || [];
      setDivisionalSecretariats(newDivisionalSecretariats);
      setSelectedDivisionalSecretariat('');
      setGNDivisions([]);
    } else {
      setDivisionalSecretariats([]);
      setSelectedDivisionalSecretariat('');
      setGNDivisions([]);
    }
  }, [selectedProvince, selectedDistrict, districtDivisionalSecretariatMap]);

  // Fetch GN divisions when divisional secretariat changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedDivisionalSecretariat) {
      const fetchGNDivisions = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get('http://localhost:5000/api/gn-divisions', {
            params: { province: selectedProvince, district: selectedDistrict, divisionalSecretariat: selectedDivisionalSecretariat },
          });
          setGNDivisions(response.data);
        } catch (err) {
          setError('Failed to load GN divisions. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchGNDivisions();
    } else {
      setGNDivisions([]);
    }
  }, [selectedProvince, selectedDistrict, selectedDivisionalSecretariat]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
  };

  // Handle divisional secretariat selection
  const handleDivisionalSecretariatChange = (e) => {
    const divisionalSecretariat = e.target.value;
    setSelectedDivisionalSecretariat(divisionalSecretariat);
  };

  // Handle adding a new GN division
  const handleAddGNDivision = async () => {
    if (!newGNDivision.trim()) {
      setError('GN division name cannot be empty.');
      return;
    }
    if (selectedProvince && selectedDistrict && selectedDivisionalSecretariat) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://localhost:5000/api/gn-divisions', {
          province: selectedProvince,
          district: selectedDistrict,
          divisionalSecretariat: selectedDivisionalSecretariat,
          gnDivision: newGNDivision.trim(),
        });
        setGNDivisions(response.data);
        setNewGNDivision('');
        setIsModalOpen(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add GN division.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle deleting a GN division
  const handleDeleteGNDivision = async (gnDivision) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/gn-divisions', {
        data: {
          province: selectedProvince,
          district: selectedDistrict,
          divisionalSecretariat: selectedDivisionalSecretariat,
          gnDivision,
        },
      });
      setGNDivisions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete GN division.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">GN Divisions</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">GN Divisions</h2>
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
              disabled={!selectedProvince || !selectedDistrict || !selectedDivisionalSecretariat || loading}
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

          <div className="flex flex-col">
            <label
              htmlFor="divisionalSecretariat"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Divisional Secretariat
            </label>
            <select
              id="divisionalSecretariat"
              value={selectedDivisionalSecretariat}
              onChange={handleDivisionalSecretariatChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedDistrict || loading}
            >
              <option value="">Nothing Selected</option>
              {divisionalSecretariats.map((divisionalSecretariat) => (
                <option key={divisionalSecretariat} value={divisionalSecretariat}>
                  {divisionalSecretariat}
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
                <th className="border px-4 py-2">District</th>
                <th className="border px-4 py-2">Divisional Secretariat</th>
                <th className="border px-4 py-2">GN Division</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {gnDivisions.length > 0 ? (
                gnDivisions.map((gnDivision, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 36}</td>
                    <td className="border px-4 py-2 text-center">{selectedProvince}</td>
                    <td className="border px-4 py-2 text-center">{selectedDistrict}</td>
                    <td className="border px-4 py-2 text-center">{selectedDivisionalSecretariat}</td>
                    <td className="border px-4 py-2 text-center">{gnDivision}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteGNDivision(gnDivision)}
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
                  <td colSpan="7" className="border px-4 py-2 text-center text-gray-500">
                    No GN divisions available for this divisional secretariat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {gnDivisions.length} of {gnDivisions.length} entries
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
              <h2 className="text-xl font-bold">Add New GN Division</h2>
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
                htmlFor="newGNDivision"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                GN Division
              </label>
              <input
                id="newGNDivision"
                type="text"
                value={newGNDivision}
                onChange={(e) => setNewGNDivision(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter GN division name"
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
                onClick={handleAddGNDivision}
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

export default GNDivisions;