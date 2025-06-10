import React, { useState } from 'react';

const MagistrateCourtReportDetails = () => {
  const [formData, setFormData] = useState({
    factReported: '',
    magistrateCourt: '',
    date: '',
    mcCaseNo: '',
    bCaseNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Magistrate Court Report Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="factReported" className="block text-gray-700">Fact Reported to the Magistrate Court</label>
          <select
            id="factReported"
            name="factReported"
            className="w-full p-2 border rounded"
            value={formData.factReported}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="magistrateCourt" className="block text-gray-700">Magistrate Court</label>
          <select
            id="magistrateCourt"
            name="magistrateCourt"
            className="w-full p-2 border rounded"
            value={formData.magistrateCourt}
            onChange={handleChange}
          >
            <option value="">Nothing selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full p-2 border rounded"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="mcCaseNo" className="block text-gray-700">MC Court (Case No)</label>
          <input
            type="text"
            id="mcCaseNo"
            name="mcCaseNo"
            className="w-full p-2 border rounded"
            value={formData.mcCaseNo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="bCaseNo" className="block text-gray-700">B Number (Case No)</label>
          <input
            type="text"
            id="bCaseNo"
            name="bCaseNo"
            className="w-full p-2 border rounded"
            value={formData.bCaseNo}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MagistrateCourtReportDetails;
