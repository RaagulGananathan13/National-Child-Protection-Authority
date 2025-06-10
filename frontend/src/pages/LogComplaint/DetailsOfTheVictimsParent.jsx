// src/pages/LogComplaint/DetailsOfTheVictimsParent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

function DetailsOfTheVictimsParent() {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [parents, setParents] = useState([
    { name: '', nic: '', gender: '', address: '', district: '', divisionalSecretariat: '', residentialSector: 'Urban', gndivision: '', policeDivision: '', policeStation: '', sectorOfOccupation: 'Government', skillLevelOfOccupation: 'Unskilled' },
  ]);

  const addParent = () => {
    setParents([...parents, { name: '', nic: '', gender: '', address: '', district: '', divisionalSecretariat: '', residentialSector: 'Urban', gndivision: '', policeDivision: '', policeStation: '', sectorOfOccupation: 'Government', skillLevelOfOccupation: 'Unskilled' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedParents = [...parents];
    updatedParents[index][field] = value;
    setParents(updatedParents);
  };

  // Close button handler to redirect to '/log-main-complaint'
  const handleAddParentForm = () => {
    navigate('/add-parent-guardian'); // Navigate to AddParentGuardianForm page
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Victim's Parent/Guardian</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NIC</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={parent.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={parent.nic}
                  onChange={(e) => handleChange(index, 'nic', e.target.value)}
                  className="w-full px-2 py-1 border rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={parent.gender}
                  onChange={(e) => handleChange(index, 'gender', e.target.value)}
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
        onClick={handleAddParentForm} // This will redirect to the Add Parent/Guardian form
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Add another Parent/Guardian
      </button>
    </div>
  );
}

export default DetailsOfTheVictimsParent;
