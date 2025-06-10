import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

// Sample data (kept as per original, not used for rendering)
const initialData = {
  Eastern: {
    Batticaloa: {
      'Koralai Pattu Central': [],
      'Eravur Pattu': [],
    },
    Ampara: {
      'Ampara': [],
      'Kalmunai': [],
    },
    Trincomalee: {
      'Trincomalee': [],
      'Kantale': [],
    },
  },
  Western: {
    Colombo: {
      'Colombo': [],
      'Dehiwala': [],
    },
    Gampaha: {
      'Gampaha': [],
      'Negombo': [],
    },
    Kalutara: {
      'Kalutara': [],
      'Panadura': [],
    },
  },
  Southern: {
    Galle: {
      'Galle': [],
      'Hikkaduwa': [],
    },
    Matara: {
      'Matara': [],
      'Weligama': [],
    },
    Hambantota: {
      'Hambantota': [],
      'Tangalle': [],
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

const RegionalOffices = () => {
  // State for selections, data, modal, loading, and error
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDsDivision, setSelectedDsDivision] = useState('');
  const [regionalOffices, setRegionalOffices] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dsDivisions, setDsDivisions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOfficeLocation, setNewOfficeLocation] = useState('');
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

        // Store districts by province
        const districtsByProvince = {};
        data.forEach(item => {
          if (item.adminName1 && item.adminName2) {
            if (!districtsByProvince[item.adminName1]) {
              districtsByProvince[item.adminName1] = new Set();
            }
            districtsByProvince[item.adminName1].add(item.adminName2);
          }
        });
        Object.keys(districtsByProvince).forEach(province => {
          districtsByProvince[province] = [...districtsByProvince[province]].sort();
        });
        if (selectedProvince && districtsByProvince[selectedProvince]) {
          setDistricts(districtsByProvince[selectedProvince]);
        }
        window.districtsByProvince = districtsByProvince; // Temporary storage
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
      setDsDivisions([]);
      setSelectedDsDivision('');
      setRegionalOffices([]);
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
          setDsDivisions([]);
          setSelectedDsDivision('');
          setRegionalOffices([]);
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

  // Fetch DS divisions when province or district changes
  useEffect(() => {
    if (!selectedProvince || !selectedDistrict) {
      setDsDivisions([]);
      setSelectedDsDivision('');
      setRegionalOffices([]);
      return;
    }

    const fetchDsDivisions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/regional-offices/divisions', {
          params: { province: selectedProvince, district: selectedDistrict },
        });
        setDsDivisions(response.data.sort());
      } catch (err) {
        console.error('Failed to fetch DS divisions:', err);
        setError('Failed to load DS divisions.');
        setDsDivisions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDsDivisions();
  }, [selectedProvince, selectedDistrict]);

  // Fetch regional offices when DS division changes
  useEffect(() => {
    if (!selectedProvince || !selectedDistrict || !selectedDsDivision) {
      setRegionalOffices([]);
      return;
    }

    const fetchRegionalOffices = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/regional-offices/offices', {
          params: { province: selectedProvince, district: selectedDistrict, dsDivision: selectedDsDivision },
        });
        setRegionalOffices(response.data);
      } catch (err) {
        console.error('Failed to fetch regional offices:', err);
        setError('Failed to load regional offices.');
        setRegionalOffices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRegionalOffices();
  }, [selectedProvince, selectedDistrict, selectedDsDivision]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict('');
    setSelectedDsDivision('');
    setRegionalOffices([]);
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedDsDivision('');
    setRegionalOffices([]);
  };

  // Handle DS division selection
  const handleDsDivisionChange = (e) => {
    const dsDivision = e.target.value;
    setSelectedDsDivision(dsDivision);
  };

  // Handle adding a new regional office
  const handleAddRegionalOffice = async () => {
    if (!newOfficeLocation.trim()) {
      setError('Office location is required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      console.log('Sending POST request:', {
        province: selectedProvince,
        district: selectedDistrict,
        dsDivision: selectedDsDivision,
        location: newOfficeLocation.trim(),
      });
      const response = await axios.post('http://localhost:5000/api/regional-offices/offices', {
        province: selectedProvince,
        district: selectedDistrict,
        dsDivision: selectedDsDivision,
        location: newOfficeLocation.trim(),
      });
      console.log('POST response:', response.data);
      setRegionalOffices(response.data);
      setNewOfficeLocation('');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding regional office:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to add regional office.');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a regional office
  const handleDeleteRegionalOffice = async (officeLocation) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete('http://localhost:5000/api/regional-offices/offices', {
        data: {
          province: selectedProvince,
          district: selectedDistrict,
          dsDivision: selectedDsDivision,
          location: officeLocation,
        },
      });
      setRegionalOffices(response.data);
    } catch (err) {
      console.error('Error deleting regional office:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to delete regional office.');
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

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Regional Offices</h1>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Regional Offices</h2>
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
              disabled={!selectedProvince || !selectedDistrict || !selectedDsDivision || loading}
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
            <label htmlFor="dsDivision" className="text-sm font-semibold text-gray-700 mb-2">
              Divisional Secretariats
            </label>
            <select
              id="dsDivision"
              value={selectedDsDivision}
              onChange={handleDsDivisionChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedDistrict || loading}
            >
              <option value="">Select Divisional Secretariat</option>
              {dsDivisions.map((division) => (
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
                <th className="border px-4 py-2">Ds Division</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {regionalOffices.length > 0 ? (
                regionalOffices.map((office, index) => (
                  <tr key={office.location} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{office.province}</td>
                    <td className="border px-4 py-2 text-center">{office.district}</td>
                    <td className="border px-4 py-2 text-center">{office.dsDivision}</td>
                    <td className="border px-4 py-2 text-center">{office.location}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteRegionalOffice(office.location)}
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
                    No regional offices available for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing 1 to {regionalOffices.length} of {regionalOffices.length} entries
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
              <h2 className="text-xl font-bold">Add New Regional Office</h2>
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
                htmlFor="newOfficeLocation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Office Location
              </label>
              <input
                id="newOfficeLocation"
                type="text"
                value={newOfficeLocation}
                onChange={(e) => setNewOfficeLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter office location"
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
                onClick={handleAddRegionalOffice}
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

export default RegionalOffices;