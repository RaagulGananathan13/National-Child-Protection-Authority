// src/pages/LogComplaint/ReliefExpectedFromNCPA.jsx
import React, { useState } from 'react';

function ReliefExpectedFromNCPA() {
  const [formData, setFormData] = useState({
    expectedRelief: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Relief Expected from the National Child Protection Authority</h2>

      <div className="flex flex-col mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2">Expected Relief</label>
        <select
          name="expectedRelief"
          value={formData.expectedRelief}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Nothing selected</option>
          <option value="Relief Type 1">Relief Type 1</option>
          <option value="Relief Type 2">Relief Type 2</option>
          <option value="Relief Type 3">Relief Type 3</option>
        </select>
      </div>
    </div>
  );
}

export default ReliefExpectedFromNCPA;
