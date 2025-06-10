import React, { useState } from 'react';

const DetailsOfTheVictim = () => {
  const [formData, setFormData] = useState({
    victimName: '',
    victimNic: '',
    birthDate: '',
    victimAge: '',
    victimAgeInMonths: '',
    victimGender: '',
    victimAddress: '',
    language: 'Sinhala',
    schoolAttending: '',
    schoolType: '',
    schoolProvince: '',
    schoolName: '',
    grade: '',
    educationalZone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Victim</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Victim's Name */}
        <div className="flex flex-col">
          <label htmlFor="victimName" className="text-sm font-semibold text-gray-700 mb-2">Victim’s Name (*)</label>
          <input
            type="text"
            name="victimName"
            value={formData.victimName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Name"
          />
        </div>

        {/* Victim NIC */}
        <div className="flex flex-col">
          <label htmlFor="victimNic" className="text-sm font-semibold text-gray-700 mb-2">Victim NIC</label>
          <input
            type="text"
            name="victimNic"
            value={formData.victimNic}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="NIC"
          />
        </div>

        {/* Birth Date */}
        <div className="flex flex-col">
          <label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Age of Victim */}
        <div className="flex flex-col">
          <label htmlFor="victimAge" className="text-sm font-semibold text-gray-700 mb-2">Age of Victim In Years</label>
          <input
            type="text"
            name="victimAge"
            value={formData.victimAge}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Age"
          />
        </div>

         {/* Age of Victim */}
      <div className="flex flex-col">
          <label htmlFor="victimAgeInMonths" className="text-sm font-semibold text-gray-700 mb-2">Age of Victim In Months</label>
          <input
            type="text"
            name="victimAgeInMonths"
            value={formData.victimAgeInMonths}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Age"
          />
        </div>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Victim Gender */}
        <div className="flex flex-col">
          <label htmlFor="victimGender" className="text-sm font-semibold text-gray-700 mb-2">Victim Gender</label>
          <select
            name="victimGender"
            value={formData.victimGender}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Victim Address */}
        <div className="flex flex-col">
          <label htmlFor="victimAddress" className="text-sm font-semibold text-gray-700 mb-2">Victim Address</label>
          <textarea
            name="victimAddress"
            value={formData.victimAddress}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Language */}
        <div className="flex flex-col">
          <label htmlFor="language" className="text-sm font-semibold text-gray-700 mb-2">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* School Attending */}
        <div className="flex flex-col">
          <label htmlFor="schoolAttending" className="text-sm font-semibold text-gray-700 mb-2">School Attending</label>
          <select
            name="schoolAttending"
            value={formData.schoolAttending}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="School1">School 1</option>
            <option value="School2">School 2</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* School Type */}
        <div className="flex flex-col">
          <label htmlFor="schoolType" className="text-sm font-semibold text-gray-700 mb-2">School Type</label>
          <select
            name="schoolType"
            value={formData.schoolType}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* School Province */}
        <div className="flex flex-col">
          <label htmlFor="schoolProvince" className="text-sm font-semibold text-gray-700 mb-2">School Province</label>
          <select
            name="schoolProvince"
            value={formData.schoolProvince}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Western">Western</option>
            <option value="Central">Central</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* School Name */}
        <div className="flex flex-col">
          <label htmlFor="schoolName" className="text-sm font-semibold text-gray-700 mb-2">School Name</label>
          <select
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="SchoolA">School A</option>
            <option value="SchoolB">School B</option>
          </select>
        </div>

        {/* Grade */}
        <div className="flex flex-col">
          <label htmlFor="grade" className="text-sm font-semibold text-gray-700 mb-2">Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Grade1">Grade 1</option>
            <option value="Grade2">Grade 2</option>
          </select>
        </div>
      </div>

      {/* Educational Zone */}
      <div className="flex flex-col mb-4">
        <label htmlFor="educationalZone" className="text-sm font-semibold text-gray-700 mb-2">Educational Zone</label>
        <select
          name="educationalZone"
          value={formData.educationalZone}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Nothing selected</option>
          <option value="Zone1">Zone 1</option>
          <option value="Zone2">Zone 2</option>
        </select>
      </div>
    </div>
  );
};

export default DetailsOfTheVictim;
