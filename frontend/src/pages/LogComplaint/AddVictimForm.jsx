// src/pages/LogComplaint/AddVictimForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

function AddVictimForm() {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [victim, setVictim] = useState({
    name: '',
    nic: '',
    birthDate: '',
    age: '',
    gender: '',
    address: '',
    residentialSector: '',
    province: '',
    district: '',
    policeDivision: '',
    policeStation: '',
    months: '',
    gndivision: '',
    divisionalSecretariat: '',
    schoolAttending: '',
    schoolType: '',
    schoolProvince: '',
    educationalZone: '',
    schoolName: '',
    grade: '',
    disabilities: '',
    disabilityTypes: '',
    diseasesTypes: '',
    diseases: '',
    numberOfBrothers: '',
    numberOfSisters: '',
    isVictimProducedBeforeJMO: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVictim({ ...victim, [name]: value });
  };

  // Close button handler to redirect to '/log-main-complaint'
  const handleClose = () => {
    navigate('/log-main-complaint'); // Use navigate for redirection
  };

  return (
    <div
    className="p-6 bg-cover bg-center min-h-screen"
    style={{ backgroundImage: `url('/images/background.jpg')` }}
  >
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Victim</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          {/* Victim's Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Victim's Name (*)</label>
            <input
              type="text"
              name="name"
              value={victim.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Victim NIC */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Victim NIC</label>
            <input
              type="text"
              name="nic"
              value={victim.nic}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Birth Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={victim.birthDate}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={victim.age}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Victim Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Victim (Gender)</label>
            <select
              name="gender"
              value={victim.gender}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          {/* Victim Address */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Victim Address</label>
            <textarea
              name="address"
              value={victim.address}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              rows="4"
            />
          </div>

          {/* Residential Sector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Residential Sector</label>
            <input
              type="text"
              name="residentialSector"
              value={victim.residentialSector}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Province */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Province</label>
            <input
              type="text"
              name="province"
              value={victim.province}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">District</label>
            <input
              type="text"
              name="district"
              value={victim.district}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* G.N.Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">G.N.Division</label>
            <input
              type="text"
              name="gndivision"
              value={victim.gndivision}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Divisional Secretariat */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Divisional Secretariat</label>
            <input
              type="text"
              name="divisionalSecretariat"
              value={victim.divisionalSecretariat}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* School Attending */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">School Attending</label>
            <select
              name="schoolAttending"
              value={victim.schoolAttending}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="School 1">School 1</option>
              <option value="School 2">School 2</option>
            </select>
          </div>

          {/* School Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">School Type</label>
            <select
              name="schoolType"
              value={victim.schoolType}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>

          {/* School Province */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">School Province</label>
            <select
              name="schoolProvince"
              value={victim.schoolProvince}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
          </div>

          {/* Educational Zone */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Educational Zone</label>
            <select
              name="educationalZone"
              value={victim.educationalZone}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Zone 1">Zone 1</option>
              <option value="Zone 2">Zone 2</option>
            </select>
          </div>

          {/* School Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={victim.schoolName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Grade */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Grade</label>
            <select
              name="grade"
              value={victim.grade}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto">Submit Victim</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddVictimForm;
