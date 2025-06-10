import React, { useState } from 'react';

const DetailsOfVictim = () => {
  const [victims, setVictims] = useState([
    { id: 1, name: 'John Doe', nic: '123456789V', gender: 'Male', age: 30, address: '123 Main St' },
    { id: 2, name: 'Jane Doe', nic: '987654321V', gender: 'Female', age: 25, address: '456 Elm St' }
  ]);
  
  // Handle remove victim action
  const handleRemoveVictim = (victimId) => {
    setVictims(victims.filter(victim => victim.id !== victimId)); // Remove victim from state
  };

  // Handle add new victim
  const handleAddVictim = () => {
    const newVictim = {
      id: victims.length + 1,
      name: '',
      nic: '',
      gender: '',
      age: '',
      address: ''
    };
    setVictims([...victims, newVictim]);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Victim</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">NIC</th>
            <th className="border-b px-4 py-2 text-left">Gender</th>
            <th className="border-b px-4 py-2 text-left">Age</th>
            <th className="border-b px-4 py-2 text-left">Address</th>
            <th className="border-b px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {victims.map((victim) => (
            <tr key={victim.id}>
              <td className="border-b px-4 py-2">{victim.name}</td>
              <td className="border-b px-4 py-2">{victim.nic}</td>
              <td className="border-b px-4 py-2">{victim.gender}</td>
              <td className="border-b px-4 py-2">{victim.age}</td>
              <td className="border-b px-4 py-2">{victim.address}</td>
              <td className="border-b px-4 py-2">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleRemoveVictim(victim.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-500 text-white p-2 rounded mt-4"
        onClick={handleAddVictim}
      >
        Add another Victim
      </button>
    </div>
  );
};

export default DetailsOfVictim;
