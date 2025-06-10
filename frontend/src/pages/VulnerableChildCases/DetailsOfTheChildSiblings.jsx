import React, { useState } from 'react';

const DetailsOfTheChildSiblings = () => {
  const [siblingsList, setSiblingsList] = useState([]);

  const handleAddSibling = () => {
    // Placeholder function to simulate adding a sibling
    const newSibling = {
      name: 'Sibling Name',
      gender: 'Male',
      birthday: '2000-01-01',
      age: '21'
    };
    setSiblingsList([...siblingsList, newSibling]);
  };

  const handleDeleteSibling = (index) => {
    const updatedList = siblingsList.filter((_, i) => i !== index);
    setSiblingsList(updatedList);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Child's Brothers and Sisters</h2>

      {/* Sibling Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Birthday</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {siblingsList.map((sibling, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{sibling.name}</td>
                <td className="py-2 px-4 border-b">{sibling.gender}</td>
                <td className="py-2 px-4 border-b">{sibling.birthday}</td>
                <td className="py-2 px-4 border-b">{sibling.age}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDeleteSibling(index)}
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

      {/* Add Sibling Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddSibling}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Sibling
        </button>
      </div>
    </div>
  );
};

export default DetailsOfTheChildSiblings;
