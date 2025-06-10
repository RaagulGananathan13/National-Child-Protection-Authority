// src/pages/LogComplaint/DetailsOfTheVictim.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DetailsOfTheVictim() {
  const navigate = useNavigate();
  const [victims, setVictims] = useState([ { name: '', nic: '', gender: '', age: '', address: '' } ]);

  const addVictim = () => {
    navigate('/add-victim'); // Navigate to the Add Victim form page
  };

  const handleChange = (index, field, value) => {
    const updatedVictims = [...victims];
    updatedVictims[index][field] = value;
    setVictims(updatedVictims);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Victim</h2>
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
          {victims.map((victim, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={victim.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={victim.nic}
                  onChange={(e) => handleChange(index, 'nic', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={victim.gender}
                  onChange={(e) => handleChange(index, 'gender', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={victim.age}
                  onChange={(e) => handleChange(index, 'age', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={victim.address}
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
        onClick={addVictim}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Add another Victim
      </button>
    </div>
  );
}

export default DetailsOfTheVictim;
