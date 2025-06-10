import React, { useState } from 'react';

const TheActionTaken = () => {
  const [formData, setFormData] = useState({
    action: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data (you can replace this with your submit logic)
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">The Action Taken</h2>

      {/* Form for Action Taken */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Action Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="action" className="text-sm font-semibold text-gray-700 mb-2">Action</label>
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select Action</option>
              <option value="Advised the parents/guardians">Advised the parents/guardians</option>
              <option value="Investigated further">Investigated further</option>
              <option value="Reported to authorities">Reported to authorities</option>
            </select>
          </div>

          {/* Remarks Textarea */}
          <div className="flex flex-col">
            <label htmlFor="remarks" className="text-sm font-semibold text-gray-700 mb-2">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              placeholder="Details"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TheActionTaken;
