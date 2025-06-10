import React, { useState } from 'react';

const DetailsOfTheVictimsParentGuardian = () => {
  const [guardianList, setGuardianList] = useState([]);

  const handleAddGuardian = () => {
    // Example logic for adding a new guardian to the list
    const newGuardian = {
      name: 'John Doe',  // Replace with dynamic data if needed
      nic: '123456789V',
      gender: 'Male',
      parentGuardianName: 'Jane Doe',
      relationship: 'Mother',
    };
    setGuardianList([...guardianList, newGuardian]);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Victim's Parent/Guardian</h2>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
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
            {guardianList.map((guardian, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{guardian.name}</td>
                <td className="py-2 px-4 border-b">{guardian.nic}</td>
                <td className="py-2 px-4 border-b">{guardian.gender}</td>
                <td className="py-2 px-4 border-b">{guardian.parentGuardianName}</td>
                <td className="py-2 px-4 border-b">{guardian.relationship}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Parent/Guardian Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          onClick={handleAddGuardian}
        >
          Add Parent/Guardian
        </button>
      </div>
    </div>
  );
};

export default DetailsOfTheVictimsParentGuardian;
