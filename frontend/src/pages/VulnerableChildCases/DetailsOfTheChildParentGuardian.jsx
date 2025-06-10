import React, { useState } from 'react';

const DetailsOfTheChildParentGuardian = () => {
  const [parentGuardianList, setParentGuardianList] = useState([]);

  const handleAddParentGuardian = () => {
    // Placeholder function to simulate adding a parent/guardian
    const newEntry = {
      name: 'John Doe',
      nic: '123456789V',
      gender: 'Male',
      parentGuardian: 'Jane Doe',
      relationship: 'Mother'
    };
    setParentGuardianList([...parentGuardianList, newEntry]);
  };

  const handleDeleteParentGuardian = (index) => {
    const updatedList = parentGuardianList.filter((_, i) => i !== index);
    setParentGuardianList(updatedList);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Child's Parent/Guardian</h2>

      {/* Parent/Guardian Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">NIC</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Parent/Guardian</th>
              <th className="py-2 px-4 border-b">Relationship</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {parentGuardianList.map((parentGuardian, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{parentGuardian.name}</td>
                <td className="py-2 px-4 border-b">{parentGuardian.nic}</td>
                <td className="py-2 px-4 border-b">{parentGuardian.gender}</td>
                <td className="py-2 px-4 border-b">{parentGuardian.parentGuardian}</td>
                <td className="py-2 px-4 border-b">{parentGuardian.relationship}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDeleteParentGuardian(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Parent/Guardian Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddParentGuardian}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Parent/Guardian
        </button>
      </div>
    </div>
  );
};

export default DetailsOfTheChildParentGuardian;
