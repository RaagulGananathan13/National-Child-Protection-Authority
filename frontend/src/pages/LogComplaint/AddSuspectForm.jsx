// src/pages/LogComplaint/AddSuspectForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

function AddSuspectForm() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [suspect, setSuspect] = useState({
    name: '',
    nic: '',
    isArrested: 'Unknown',
    gender: 'Nothing Selected',
    age: '',
    contactNumber: '',
    foreignLocal: 'Nothing Selected',
    country: 'Nothing selected',
    province: 'Nothing selected',
    district: 'Nothing selected',
    divisionalSecretariat: 'Nothing selected',
    residentialSector: 'Urban',
    gndivision: 'Nothing selected',
    address: '',
    policeDivision: 'Nothing selected',
    policeStation: 'Nothing selected',
    currentJob: 'Nothing selected',
    educationLevel: 'Nothing selected',
    civilStatus: 'Nothing selected',
    numberOfMaleChildren: '',
    numberOfFemaleChildren: '',
    disabilities: 'Nothing Selected',
    disabilityTypes: 'Nothing selected',
    diseasesTypes: 'Nothing Selected',
    diseases: 'Nothing Selected',
    useDrugs: 'No',
    useAlcoholTobacco: 'No',
    isSuspectKid: 'No',
    sectorOfOccupation: 'Government',
    skillLevelOfOccupation: 'Unskilled',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuspect({ ...suspect, [name]: value });
  };

  // Close button handler to redirect to '/log-main-complaint'
  const handleClose = () => {
    navigate('/log-main-complaint'); // Navigate back to Log Main Complaint page
  };

   // Add Relationship button handler to redirect to 'add-suspect-victimrelationshipform' page
   const handleAddRelationship = () => {
    navigate('/add-suspect-victimrelationshipform'); // Navigate to the Add Relationship page
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Suspect</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          {/* Suspect's Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Suspect's Name (*)</label>
            <input
              type="text"
              name="name"
              value={suspect.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Suspect NIC */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Suspect NIC</label>
            <input
              type="text"
              name="nic"
              value={suspect.nic}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Is Suspect Arrested */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Is Suspect Arrested</label>
            <select
              name="isArrested"
              value={suspect.isArrested}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Unknown">Unknown</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Age of Suspect */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Age of Suspect</label>
            <input
              type="number"
              name="age"
              value={suspect.age}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Contact number */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={suspect.contactNumber}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Foreign / Local */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Foreign / Local</label>
            <select
              name="foreignLocal"
              value={suspect.foreignLocal}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Foreign">Foreign</option>
              <option value="Local">Local</option>
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Country</label>
            <select
              name="country"
              value={suspect.country}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Sri Lanka">Sri Lanka</option>
              {/* Add more countries as necessary */}
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={suspect.gender}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          {/* Suspect Address */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Suspect Address</label>
            <textarea
              name="address"
              value={suspect.address}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              rows="4"
            />
            <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md">Copy Previous Address</button>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">District</label>
            <select
              name="district"
              value={suspect.district}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="District 1">District 1</option>
              {/* Add more districts as necessary */}
            </select>
          </div>

          {/* Divisional Secretariat */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Divisional Secretariat</label>
            <select
              name="divisionalSecretariat"
              value={suspect.divisionalSecretariat}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Secretariat 1">Secretariat 1</option>
              {/* Add more divisional secretariats as necessary */}
            </select>
          </div>

          {/* Residential Sector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Residential Sector</label>
            <select
              name="residentialSector"
              value={suspect.residentialSector}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          {/* G.N.Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">G.N.Division</label>
            <select
              name="gndivision"
              value={suspect.gndivision}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="G.N. 1">G.N. 1</option>
              {/* Add more G.N. Divisions as necessary */}
            </select>
          </div>

          {/* Province */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Province</label>
            <select
              name="province"
              value={suspect.province}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Province 1">Province 1</option>
              {/* Add more provinces as necessary */}
            </select>
          </div>

          {/* Additional Fields for Suspect */}
          {/* Add more fields as per the given screenshot */}

           {/* Police Division */}
           <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Division</label>
            <select
              name="policeDivision"
              value={suspect.policeDivision}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Police Division 1">Police Division 1</option>
            </select>
          </div>

          {/* Police Station */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Police Station</label>
            <select
              name="policeStation"
              value={suspect.policeStation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Station 1">Station 1</option>
            </select>
          </div>

          {/* Sector of Occupation */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Sector of Occupation</label>
            <select
              name="sectorofOccupation"
              value={suspect.sectorofOccupation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
            </select>
          </div>

          {/* Skill Level of Occupation */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Skill Level of Occupation</label>
            <select
              name="skillLevelofOccupation"
              value={suspect.skillLevelofOccupation}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
            </select>
          </div>

          {/* Current job */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Current job</label>
            <select
              name="currentJob"
              value={suspect.currentJob}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Job 1">Job 1</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Education Level</label>
            <select
              name="educationLevel"
              value={suspect.educationLevel}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Degree">Degree</option>
            </select>
          </div>

          {/* Civil status */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Civil status</label>
            <select
              name="civilStatus"
              value={suspect.civilStatus}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* Number of Male/Female Children */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">No. of Male Children</label>
            <input
              type="number"
              name="numberOfMaleChildren"
              value={suspect.numberOfMaleChildren}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">No. of Female Children</label>
            <input
              type="number"
              name="numberOfFemaleChildren"
              value={suspect.numberOfFemaleChildren}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>

          {/* Disabilities */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Disabilities</label>
            <select
              name="disabilities"
              value={suspect.disabilities}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Disability 1">Disability 1</option>
            </select>
          </div>

          {/* Disability Types */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Disability Types</label>
            <select
              name="disabilityTypes"
              value={suspect.disabilityTypes}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Type 1">Type 1</option>
            </select>
          </div>

          {/* Diseases Types */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Diseases Types</label>
            <select
              name="diseasesTypes"
              value={suspect.diseasesTypes}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Type 1">Type 1</option>
            </select>
          </div>

          {/* Diseases */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Diseases</label>
            <select
              name="diseases"
              value={suspect.diseases}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing Selected">Nothing Selected</option>
              <option value="Disease 1">Disease 1</option>
            </select>
          </div>

           {/* Use Drugs */}
           <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Use Drugs</label>
            <select
              name="useDrugs"
              value={suspect.useDrugs}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Use Alcohol & Tobacco */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Use Alcohol & Tobacco</label>
            <select
              name="useAlcoholTobacco"
              value={suspect.useAlcoholTobacco}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Is Suspect a Kid? */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Is Suspect a Kid?</label>
            <select
              name="isSuspectKid"
              value={suspect.isSuspectKid}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

           {/* Add Relationship Table */}
           <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Victim Name</th>
                  <th className="border px-4 py-2">Relationship Type</th>
                  <th className="border px-4 py-2">Relationship</th>
                </tr>
              </thead>
              <tbody>
                {/* Add relationship rows dynamically here */}
              </tbody>
            </table>
            <button
              onClick={handleAddRelationship}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Add Relationships
            </button>
          </div>

        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto">Submit Suspect</button>
        </div>
      </div>
    </div>
  );
}

export default AddSuspectForm;
