import React, { useState } from 'react';

const BasicInformation = () => {
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    divisionalSecretariat: '',
    officerName: '',
    contactNumber: '',
    reportingOfficer: '',
    gnDivision: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        {/* Province */}
        <div className="flex flex-col">
          <label htmlFor="province" className="text-sm font-semibold text-gray-700 mb-2">Province (*)</label>
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
          <label htmlFor="district" className="text-sm font-semibold text-gray-700 mb-2">District (*)</label>
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

        {/* Divisional Secretariat */}
        <div className="flex flex-col">
          <label htmlFor="divisionalSecretariat" className="text-sm font-semibold text-gray-700 mb-2">Divisional Secretariat (*)</label>
          <select
            name="divisionalSecretariat"
            value={formData.divisionalSecretariat}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Secretariat1">Secretariat 1</option>
            <option value="Secretariat2">Secretariat 2</option>
          </select>
        </div>

        {/* GN Division */}
        <div className="flex flex-col">
          <label htmlFor="gnDivision" className="text-sm font-semibold text-gray-700 mb-2">GN Division (*)</label>
          <select
            name="gnDivision"
            value={formData.gnDivision}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="GN1">GN 1</option>
            <option value="GN2">GN 2</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Officer Name */}
        <div className="flex flex-col">
          <label htmlFor="officerName" className="text-sm font-semibold text-gray-700 mb-2">Officer Name</label>
          <input
            type="text"
            name="officerName"
            value={formData.officerName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Name"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col">
          <label htmlFor="contactNumber" className="text-sm font-semibold text-gray-700 mb-2">Contact number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Number"
          />
        </div>
      </div>

      <div className="flex flex-col mb-4">
        {/* Reporting Officer */}
        <label htmlFor="reportingOfficer" className="text-sm font-semibold text-gray-700 mb-2">Reporting Officer</label>
        <input
          type="text"
          name="reportingOfficer"
          value={formData.reportingOfficer}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
          placeholder="ID"
        />
      </div>
    </div>
  );
};

export default BasicInformation;
