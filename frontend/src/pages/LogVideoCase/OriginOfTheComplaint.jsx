import React, { useState } from 'react';

const OriginOfTheComplaint = () => {
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    dsDivision: '',
    videoEvidenceUnit: '',
    receivedDate: '',
    requestedBy: '',
    caseNumber: '',
    officerName: '',
    contactNumber: '',
    policeDivision: '',
    policeStation: '',
    officerPosition: '',
    authorisedBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Origin of the Complaint</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Province */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Province1">Province 1</option>
            <option value="Province2">Province 2</option>
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="District1">District 1</option>
            <option value="District2">District 2</option>
          </select>
        </div>

        {/* DS Division */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Ds Division</label>
          <select
            name="dsDivision"
            value={formData.dsDivision}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Division1">Division 1</option>
            <option value="Division2">Division 2</option>
          </select>
        </div>

        {/* Video Evidence Unit */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Video Evidence Unit</label>
          <select
            name="videoEvidenceUnit"
            value={formData.videoEvidenceUnit}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Unit1">Unit 1</option>
            <option value="Unit2">Unit 2</option>
          </select>
        </div>
      </div>

      {/* Received Date, Requested By, Case Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Received Date</label>
          <input
            type="date"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Requested By</label>
          <select
            name="requestedBy"
            value={formData.requestedBy}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Police station">Police station</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Case Number</label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Officer Name</label>
          <input
            type="text"
            name="officerName"
            value={formData.officerName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Contact Number, Police Division, Police Station */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Police Division</label>
          <select
            name="policeDivision"
            value={formData.policeDivision}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Division1">Division 1</option>
            <option value="Division2">Division 2</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Police Station</label>
          <select
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Station1">Station 1</option>
            <option value="Station2">Station 2</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Officer Position</label>
          <input
            type="text"
            name="officerPosition"
            value={formData.officerPosition}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Authorised By */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Authorised by the Chairman/ Deputy chairman NCPA</label>
        <select
          name="authorisedBy"
          value={formData.authorisedBy}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="Authorised">Authorised</option>
          <option value="Not Authorised">Not Authorised</option>
        </select>
      </div>
    </div>
  );
};

export default OriginOfTheComplaint;
