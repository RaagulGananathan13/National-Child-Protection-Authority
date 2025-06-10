import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per previous pattern, but not used for rendering)
const initialData = {
  Eastern: {
    Batticaloa: {
      'Batticaloa Police Division': [
        { name: 'Batticaloa', district: 'Batticaloa' },
        { name: 'Vavunathive', district: 'Batticaloa' },
      ],
      'Eravur Police Division': [],
    },
    Ampara: {
      'Ampara Police Division': [],
      'Kalmunai Police Division': [],
    },
    Trincomalee: {
      'Trincomalee Police Division': [],
      'Kantale Police Division': [],
    },
  },
  Western: {
    Colombo: {
      'Colombo Central Police Division': [],
      'Colombo North Police Division': [],
    },
    Gampaha: {
      'Gampaha Police Division': [],
      'Negombo Police Division': [],
    },
    Kalutara: {
      'Kalutara Police Division': [],
      'Panadura Police Division': [],
    },
  },
  Southern: {
    Galle: {
      'Galle Police Division': [],
      'Hikkaduwa Police Division': [],
    },
    Matara: {
      'Matara Police Division': [],
      'Weligama Police Division': [],
    },
    Hambantota: {
      'Hambantota Police Division': [],
      'Tangalle Police Division': [],
    },
  },
};

// Fallback data in case Back4App API fails
const fallbackProvinces = ['Eastern', 'Western', 'Southern'];
const fallbackDistrictsByProvince = {
  Eastern: ['Batticaloa', 'Ampara', 'Trincomalee'],
  Western: ['Colombo', 'Gampaha', 'Kalutara'],
  Southern: ['Galle', 'Matara', 'Hambantota'],
};

const PoliceStations = () => {
  // State for selections, data, modal, loading, and error
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedPoliceDivision, setSelectedPoliceDivision] = useState('');
  const [policeStations, setPoliceStations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [policeDivisions, setPoliceDivisions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPoliceStationName, setNewPoliceStationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Back4App API configuration
  const back4appConfig = {
    headers: {
      'X-Parse-Application-Id': 'zS2XAEVEZAkD081UmEECFq22mAjIvX2IlTYaQfai',
      'X-Parse-Master-Key': 't6EjVCUOwutr1ruorlXNsH3Rz65g0jiVtbILtAYU',
    },
  };

  // Fetch provinces and districts from Back4App on mount
  useEffect(() => {
    const fetchAdministrativeData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          'https://parseapi.back4app.com/classes/LK?limit=100000000000000000000&keys=adminName1,adminName2',
          back4appConfig
        );
        const data = response.data.results;

        // Extract unique provinces
        const fetchedProvinces = [...new Set(data.map(item => item.adminName1))].filter(Boolean).sort();
        setProvinces(fetchedProvinces);

        // Store districts by province for later filtering
        const districtsByProvince = {};
        data.forEach(item => {
          if (item.adminName1 && item.adminName2) {
            if (!districtsByProvince[item.adminName1]) {
              districtsByProvince[item.adminName1] = new Set();
            }
            districtsByProvince[item.adminName1].add(item.adminName2);
          }
        });
        // Convert Sets to sorted arrays
        Object.keys(districtsByProvince).forEach(province => {
          districtsByProvince[province] = [...districtsByProvince[province]].sort();
        });
        // Store districts for the initially selected province (if any)
        if (selectedProvince && districtsByProvince[selectedProvince]) {
          setDistricts(districtsByProvince[selectedProvince]);
        }
        // Save districtsByProvince globally for district filtering
        window.districtsByProvince = districtsByProvince; // Temporary storage; consider better state management for production
      } catch (err) {
        console.error('Failed to fetch administrative data:', err);
        setError('Failed to load provinces and districts. Using fallback data.');
        setProvinces(fallbackProvinces);
        setDistricts(selectedProvince ? fallbackDistrictsByProvince[selectedProvince] || [] : []);
      } finally {
        setLoading(false);
      }
    };
    fetchAdministrativeData();
  }, []);

  // Update districts when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict('');
      setPoliceDivisions([]);
      setSelectedPoliceDivision('');
      setPoliceStations([]);
      return;
    }

    const updateDistricts = () => {
      setLoading(true);
      setError('');
      try {
        const districtsByProvince = window.districtsByProvince || {};
        const fetchedDistricts = districtsByProvince[selectedProvince] || fallbackDistrictsByProvince[selectedProvince] || [];
        setDistricts(fetchedDistricts);
        if (!fetchedDistricts.includes(selectedDistrict)) {
          setSelectedDistrict('');
          setPoliceDivisions([]);
          setSelectedPoliceDivision('');
          setPoliceStations([]);
        }
      } catch (err) {
        console.error('Failed to update districts:', err);
        setError('Failed to load districts. Using fallback data.');
        setDistricts(fallbackDistrictsByProvince[selectedProvince] || []);
      } finally {
        setLoading(false);
      }
    };
    updateDistricts();
  }, [selectedProvince]);

  // Fetch police divisions when province or district changes
  useEffect(() => {
    if (!selectedProvince || !selectedDistrict) {
      setPoliceDivisions([]);
      setSelectedPoliceDivision('');
      setPoliceStations([]);
      return;
    }

    const fetchPoliceDivisions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/police-divisions', {
          params: { province: selectedProvince, district: selectedDistrict },
        });
        setPoliceDivisions(response.data.sort());
      } catch (err) {
        console.error('Failed to fetch police divisions:', err);
        setError('Failed to load police divisions.');
        setPoliceDivisions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPoliceDivisions();
  }, [selectedProvince, selectedDistrict]);

  // Fetch police stations when police division changes
  useEffect(() => {
    if (!selectedProvince || !selectedDistrict || !selectedPoliceDivision) {
      setPoliceStations([]);
      return;
    }

    const fetchPoliceStations = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/police-stations/stations', {
          params: { province: selectedProvince, district: selectedDistrict, policeDivision: selectedPoliceDivision },
        });
        setPoliceStations(response.data);
      } catch (err) {
        console.error('Failed to fetch police stations:', err);
        setError('Failed to load police stations.');
        setPoliceStations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPoliceStations();
  }, [selectedProvince, selectedDistrict, selectedPoliceDivision]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict('');
    setSelectedPoliceDivision('');
    setPoliceStations([]);
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedPoliceDivision('');
    setPoliceStations([]);
  };

  // Handle police division selection
  const handlePoliceDivisionChange = (e) => {
    const policeDivision = e.target.value;
    setSelectedPoliceDivision(policeDivision);
  };

  // Handle adding a new police station
  const handleAddPoliceStation = async () => {
    if (!newPoliceStationName.trim()) {
      setError('Police station name is required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/police-stations/stations', {
        province: selectedProvince,
        district: selectedDistrict,
        policeDivision: selectedPoliceDivision,
        name: newPoliceStationName.trim(),
      });
      setPoliceStations(response.data);
      setNewPoliceStationName('');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add police station.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a police station
  const handleDeletePoliceStation = async (policeStationName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/police-stations/stations', {
        data: {
          province: selectedProvince,
          district: selectedDistrict,
          policeDivision: selectedPoliceDivision,
          name: policeStationName,
        },
      });
      setPoliceStations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete police station.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Police Stations</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Police Stations</h2>
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
              disabled={!selectedProvince || !selectedDistrict || !selectedPoliceDivision || loading}
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedProvince || loading}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="policeDivision" className="text-sm font-semibold text-gray-700 mb-2">
              Police Division
            </label>
            <select
              id="policeDivision"
              value={selectedPoliceDivision}
              onChange={handlePoliceDivisionChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedProvince || !selectedDistrict || loading}
            >
              <option value="">Select Police Division</option>
              {policeDivisions.map((division) => (
                <option key={division} value={division}>
                  {division}
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
                <th className="border px-4 py-2">Police Division</th>
                <th className="border px-4 py-2">Police Station</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {policeStations.length > 0 ? (
                policeStations.map((station, index) => (
                  <tr key={station.name} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 451}</td>
                    <td className="border px-4 py-2 text-center">{station.province}</td>
                    <td className="border px-4 py-2 text-center">{station.district}</td>
                    <td className="border px-4 py-2 text-center">{station.policeDivision}</td>
                    <td className="border px-4 py-2 text-center">{station.name}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeletePoliceStation(station.name)}
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
                    No police stations available for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {policeStations.length} of {policeStations.length} entries
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
              <h2 className="text-xl font-bold">Add New Police Stations</h2>
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
                htmlFor="newPoliceStationName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Police Station
              </label>
              <input
                id="newPoliceStationName"
                type="text"
                value={newPoliceStationName}
                onChange={(e) => setNewPoliceStationName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter police station name"
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
                onClick={handleAddPoliceStation}
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

export default PoliceStations;