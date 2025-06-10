import React, { useState } from 'react';

const DetailsOfTheChild = () => {
  const [formData, setFormData] = useState({
    childName: '',
    childNic: '',
    birthDate: '',
    ageInYears: '',
    months: '',
    childGender: '',
    childAddress: '',
    specialNotes: '',
    schoolAttending: '',
    schoolType: '',
    schoolProvince: '',
    schoolName: '',
    grade: '',
    currentStatusOfChild: '',
    educationalZone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Child</h2>

      {/* First row: Child's Name, NIC, Birth Date, Age */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="childName" className="text-sm font-semibold text-gray-700 mb-2">Child's Name (*)</label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="childNic" className="text-sm font-semibold text-gray-700 mb-2">Child NIC</label>
          <input
            type="text"
            name="childNic"
            value={formData.childNic}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="NIC"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthDate" className="text-sm font-semibold text-gray-700 mb-2">Birth Date (*)</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ageInYears" className="text-sm font-semibold text-gray-700 mb-2">Age of Child In Years (*)</label>
          <input
            type="text"
            name="ageInYears"
            value={formData.ageInYears}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Age"
          />
        </div>
      </div>

      {/* Second row: Months, Child Gender, Child Address, Special Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="months" className="text-sm font-semibold text-gray-700 mb-2">Months (*)</label>
          <select
            name="months"
            value={formData.months}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Age">Age</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="childGender" className="text-sm font-semibold text-gray-700 mb-2">Child Gender (*)</label>
          <select
            name="childGender"
            value={formData.childGender}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="childAddress" className="text-sm font-semibold text-gray-700 mb-2">Child Address</label>
          <textarea
            name="childAddress"
            value={formData.childAddress}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="specialNotes" className="text-sm font-semibold text-gray-700 mb-2">Special Notes</label>
          <textarea
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Special Notes"
          />
        </div>
      </div>

      {/* Third row: School Attending, School Type, School Province, Educational Zone */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="schoolAttending" className="text-sm font-semibold text-gray-700 mb-2">School Attending</label>
          <select
            name="schoolAttending"
            value={formData.schoolAttending}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="School1">School 1</option>
            <option value="School2">School 2</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="schoolType" className="text-sm font-semibold text-gray-700 mb-2">School Type</label>
          <select
            name="schoolType"
            value={formData.schoolType}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="schoolProvince" className="text-sm font-semibold text-gray-700 mb-2">School-Province (*)</label>
          <select
            name="schoolProvince"
            value={formData.schoolProvince}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Province1">Province 1</option>
            <option value="Province2">Province 2</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="educationalZone" className="text-sm font-semibold text-gray-700 mb-2">Educational Zone</label>
          <select
            name="educationalZone"
            value={formData.educationalZone}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Zone1">Zone 1</option>
            <option value="Zone2">Zone 2</option>
          </select>
        </div>
      </div>

      {/* Fourth row: School Name, Grade, Current Status of Child */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="schoolName" className="text-sm font-semibold text-gray-700 mb-2">School Name</label>
          <select
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="SchoolA">School A</option>
            <option value="SchoolB">School B</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="grade" className="text-sm font-semibold text-gray-700 mb-2">Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Grade1">Grade 1</option>
            <option value="Grade2">Grade 2</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="currentStatusOfChild" className="text-sm font-semibold text-gray-700 mb-2">Current Status of Child</label>
          <select
            name="currentStatusOfChild"
            value={formData.currentStatusOfChild}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DetailsOfTheChild;
