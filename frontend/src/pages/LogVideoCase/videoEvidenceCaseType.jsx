import React, { useState } from 'react';

const VideoEvidenceCaseType = () => {
  const [caseType, setCaseType] = useState('');
  const [court, setCourt] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'caseType') setCaseType(value);
    if (name === 'court') setCourt(value);
    if (name === 'caseNumber') setCaseNumber(value);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Video Evidence Handling Sub Database</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Case Type */}
        <div className="flex flex-col">
          <label htmlFor="caseType" className="text-sm font-semibold text-gray-700 mb-2">Video Evidence Case Type</label>
          <select
            name="caseType"
            value={caseType}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing Selected</option>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </select>
        </div>

        {/* Court */}
        <div className="flex flex-col">
          <label htmlFor="court" className="text-sm font-semibold text-gray-700 mb-2">According to</label>
          <select
            name="court"
            value={court}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Magistrate Court">Magistrate Court</option>
            <option value="Other Court">Other Court</option>
          </select>
        </div>

        {/* Case Number */}
        <div className="flex flex-col">
          <label htmlFor="caseNumber" className="text-sm font-semibold text-gray-700 mb-2">Case Number</label>
          <input
            type="text"
            name="caseNumber"
            value={caseNumber}
            onChange={handleChange}
            placeholder="Enter Case Number"
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoEvidenceCaseType;
