// src/pages/LogComplaint/AddParentGuardianForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

function AddParentGuardianForm() {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [parent, setParent] = useState({
    name: '',
    nic: '',
    gender: '',
    address: '',
    district: '',
    divisionalSecretariat: '',
    residentialSector: 'Urban',
    gndivision: '',
    policeDivision: '',
    policeStation: '',
    sectorOfOccupation: 'Government',
    skillLevelOfOccupation: 'Unskilled',
    province: '', // Added Province
    currentJob: '', // Added Current job
    foreignEmployed: '', // Added Foreign Employed
    educationLevel: '', // Added Education Level
    averageMonthlyIncome: '', // Added Average Monthly Income
    disabilities: '', // Added Disabilities
    disabilityTypes: '', // Added Disability Types
    diseasesTypes: '', // Added Diseases Types
    diseases: '', // Added Diseases
    useDrugs: 'No', // Added Use Drugs
    useAlcoholTobacco: 'No', // Added Use Alcohol & Tobacco
    status: '', // Added Status
    contactNumber: '', // Added Contact number
    noOfMaleChildren: '', // Added No. of Male Children
    noOfFemaleChildren: '', // Added No. of Female Children
    relationshipType: '', // Added Relationship Type
    relationship: '', // Added Relationship
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent({ ...parent, [name]: value });
  };

  // Close button handler to redirect to '/log-main-complaint'
  const handleClose = () => {
    navigate('/log-main-complaint'); // Navigate back to Log Main Complaint page
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Parent/Guardian</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          {/* Parent's Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Parent/Guardian's Name (*)</label>
            <input
              type="text"
              name="name"
              value={parent.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Parent NIC */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Parent/Guardian NIC</label>
            <input
              type="text"
              name="nic"
              value={parent.nic}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={parent.gender}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={parent.address}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              rows="4"
            />
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">District</label>
            <input
              type="text"
              name="district"
              value={parent.district}
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
              value={parent.divisionalSecretariat}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Residential Sector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Residential Sector</label>
            <select
              name="residentialSector"
              value={parent.residentialSector}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          {/* G.N. Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">G.N. Division</label>
            <input
              type="text"
              name="gndivision"
              value={parent.gndivision}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Police Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Division</label>
            <input
              type="text"
              name="policeDivision"
              value={parent.policeDivision}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Police Station */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Station</label>
            <input
              type="text"
              name="policeStation"
              value={parent.policeStation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Occupation Sector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Sector of Occupation</label>
            <select
              name="sectorOfOccupation"
              value={parent.sectorOfOccupation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Skill Level of Occupation */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Skill Level of Occupation</label>
            <select
              name="skillLevelOfOccupation"
              value={parent.skillLevelOfOccupation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Unskilled">Unskilled</option>
              <option value="Skilled">Skilled</option>
            </select>
          </div>

          {/* Current Job */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Current job</label>
            <select
              name="currentJob"
              value={parent.currentJob}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Job 1">Job 1</option>
              <option value="Job 2">Job 2</option>
            </select>
          </div>

          {/* Foreign Employed */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Foreign Employed</label>
            <select
              name="foreignEmployed"
              value={parent.foreignEmployed}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Education Level</label>
            <select
              name="educationLevel"
              value={parent.educationLevel}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
            </select>
          </div>

          {/* Average Monthly Income */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Average Monthly Income</label>
            <input
              type="text"
              name="averageMonthlyIncome"
              value={parent.averageMonthlyIncome}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Disabilities */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Disabilities</label>
            <select
              name="disabilities"
              value={parent.disabilities}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Disability 1">Disability 1</option>
              <option value="Disability 2">Disability 2</option>
            </select>
          </div>

          {/* Disability Types */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Disability Types</label>
            <select
              name="disabilityTypes"
              value={parent.disabilityTypes}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>

          {/* Diseases Types */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Diseases Types</label>
            <select
              name="diseasesTypes"
              value={parent.diseasesTypes}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>

          {/* Diseases */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Diseases</label>
            <select
              name="diseases"
              value={parent.diseases}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Disease 1">Disease 1</option>
              <option value="Disease 2">Disease 2</option>
            </select>
          </div>

          {/* No. of Male Children */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">No. of Male Children</label>
            <input
              type="number"
              name="noOfMaleChildren"
              value={parent.noOfMaleChildren}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* No. of Female Children */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">No. of Female Children</label>
            <input
              type="number"
              name="noOfFemaleChildren"
              value={parent.noOfFemaleChildren}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>


          {/* Relationship Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Relationship Type</label>
            <input
              type="text"
              name="relationshipType"
              value={parent.relationshipType}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Relationship */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              name="relationship"
              value={parent.relationship}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto">Submit Parent/Guardian</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddParentGuardianForm;
