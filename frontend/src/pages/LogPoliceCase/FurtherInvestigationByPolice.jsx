import React, { useState } from 'react';

const FurtherInvestigationByPolice = () => {
  const [formData, setFormData] = useState({
    videoEvidence: '',
    informedProbationOfficer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit form (e.g., calling an API or updating state)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Further Investigation by the Police</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="videoEvidence" className="block text-gray-700">Video Evidence Recording</label>
            <select
              id="videoEvidence"
              name="videoEvidence"
              className="w-full p-2 border rounded"
              value={formData.videoEvidence}
              onChange={handleChange}
            >
              <option value="">Nothing selected</option>
              <option value="Requested">Requested</option>
              <option value="Not Requested">Not Requested</option>
            </select>
          </div>

          <div>
            <label htmlFor="informedProbationOfficer" className="block text-gray-700">Informed Probation Officer</label>
            <input
              type="text"
              id="informedProbationOfficer"
              name="informedProbationOfficer"
              className="w-full p-2 border rounded"
              value={formData.informedProbationOfficer}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FurtherInvestigationByPolice;
