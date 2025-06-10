import React, { useState } from 'react';

const EvidenceReleaseDetails = () => {
  const [formData, setFormData] = useState({
    originalRecordReleasedToCourts: '',
    releaseAttorneyGeneralDepartment: '',
    courtCaseNo: '',
    date: '',
    verbatimReleasedAttorneyGeneral: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Evidence Release Details</h2>

      {/* Original Record Released to Courts */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Original Record was Released to Courts (MC/HC)</label>
        <select
          name="originalRecordReleasedToCourts"
          value={formData.originalRecordReleasedToCourts}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Release to Attorney General Department */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Release to the Attorney General Department</label>

        {/* Court Case No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="courtCaseNo"
            value={formData.courtCaseNo}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
            placeholder="Court (Case No)"
          />

          {/* Original Record Released */}
          <select
            name="releaseAttorneyGeneralDepartment"
            value={formData.releaseAttorneyGeneralDepartment}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Verbatim Released Attorney General */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2">Verbatim was Released Attorney General Department</label>
          <select
            name="verbatimReleasedAttorneyGeneral"
            value={formData.verbatimReleasedAttorneyGeneral}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReleaseDetails;
