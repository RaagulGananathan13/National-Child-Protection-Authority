// src/pages/LogComplaint/DetailsOfTheSuspect.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function DetailsOfTheSuspect() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [suspects, setSuspects] = useState([
    { name: '', nic: '', gender: '', age: '', address: '' },
  ]);

  const addSuspect = () => {
    setSuspects([
      ...suspects,
      { name: '', nic: '', gender: '', age: '', address: '' },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedSuspects = [...suspects];
    updatedSuspects[index][field] = value;
    setSuspects(updatedSuspects);
  };

  // Redirect to Add Suspect Form page
  const handleAddSuspectRedirect = () => {
    navigate('/add-suspect-form'); // Navigate to the Add Suspect Form page
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Suspect</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NIC</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {suspects.map((suspect, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={suspect.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={suspect.nic}
                  onChange={(e) => handleChange(index, 'nic', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={suspect.gender}
                  onChange={(e) => handleChange(index, 'gender', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={suspect.age}
                  onChange={(e) => handleChange(index, 'age', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={suspect.address}
                  onChange={(e) => handleChange(index, 'address', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {}}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddSuspectRedirect} // Redirect to Add Suspect Form page
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Add another Suspect
      </button>
    </div>
  );
}

export default DetailsOfTheSuspect;
