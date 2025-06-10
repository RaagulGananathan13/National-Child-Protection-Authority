import React, { useState } from 'react';

const DetailsOfSuspect = () => {
  const [suspects, setSuspects] = useState([
    { id: 1, name: '', nic: '', gender: '', age: '', address: '' }
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSuspects = [...suspects];
    updatedSuspects[index][name] = value;
    setSuspects(updatedSuspects);
  };

  const handleAddSuspect = () => {
    setSuspects([...suspects, { id: suspects.length + 1, name: '', nic: '', gender: '', age: '', address: '' }]);
  };

  const handleRemoveSuspect = (id) => {
    setSuspects(suspects.filter(suspect => suspect.id !== id));
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Suspect</h2>
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
          {suspects.map((suspect, index) => (
            <tr key={suspect.id}>
              <td className="border-b px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={suspect.name}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border-b px-4 py-2">
                <input
                  type="text"
                  name="nic"
                  value={suspect.nic}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border-b px-4 py-2">
                <input
                  type="text"
                  name="gender"
                  value={suspect.gender}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border-b px-4 py-2">
                <input
                  type="number"
                  name="age"
                  value={suspect.age}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border-b px-4 py-2">
                <input
                  type="text"
                  name="address"
                  value={suspect.address}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border-b px-4 py-2">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleRemoveSuspect(suspect.id)}
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
        onClick={handleAddSuspect}
      >
        Add another Suspect
      </button>
    </div>
  );
};

export default DetailsOfSuspect;
