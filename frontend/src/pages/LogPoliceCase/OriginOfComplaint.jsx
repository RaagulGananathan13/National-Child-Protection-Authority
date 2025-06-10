import React, { useState } from 'react';

const OriginOfComplaint = () => {
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    policeDivision: '',
    policeStation: '',
    dateOfFirstComplaint: '',
    timeOfFirstComplaint: '',
    informantName: '',
    caseNo: '',
    gcrNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Origin of the Complaint</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="province" className="block text-gray-700">Province(*)</label>
          <select
            id="province"
            name="province"
            className="w-full p-2 border rounded"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="district" className="block text-gray-700">District(*)</label>
          <select
            id="district"
            name="district"
            className="w-full p-2 border rounded"
            value={formData.district}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="policeDivision" className="block text-gray-700">Police Division(*)</label>
          <select
            id="policeDivision"
            name="policeDivision"
            className="w-full p-2 border rounded"
            value={formData.policeDivision}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="policeStation" className="block text-gray-700">Police Station(*)</label>
          <select
            id="policeStation"
            name="policeStation"
            className="w-full p-2 border rounded"
            value={formData.policeStation}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="dateOfFirstComplaint" className="block text-gray-700">Date of First Complaint(*)</label>
          <input
            type="date"
            id="dateOfFirstComplaint"
            name="dateOfFirstComplaint"
            className="w-full p-2 border rounded"
            value={formData.dateOfFirstComplaint}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="timeOfFirstComplaint" className="block text-gray-700">Time of First Complaint(*)</label>
          <input
            type="time"
            id="timeOfFirstComplaint"
            name="timeOfFirstComplaint"
            className="w-full p-2 border rounded"
            value={formData.timeOfFirstComplaint}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="informantName" className="block text-gray-700">Informant Name (Case No)</label>
          <input
            type="text"
            id="informantName"
            name="informantName"
            className="w-full p-2 border rounded"
            value={formData.informantName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="gcrNumber" className="block text-gray-700">GCR Number</label>
          <input
            type="text"
            id="gcrNumber"
            name="gcrNumber"
            className="w-full p-2 border rounded"
            value={formData.gcrNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OriginOfComplaint;
