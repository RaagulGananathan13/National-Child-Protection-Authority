// src/pages/LogComplaint/AddSuspectVictimRelationshipForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6

function AddSuspectVictimRelationshipForm() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [relationshipData, setRelationshipData] = useState({
    victim: 'Nothing selected',
    relativeStatus: 'Relative',
    relationshipToVictim: 'Nothing selected',
    suspectLivesWithVictim: 'Living in Same Place',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRelationshipData({ ...relationshipData, [name]: value });
  };

  // Close button handler to redirect back
  const handleClose = () => {
    navigate('/log-main-complaint'); // Navigate back to Log Main Complaint page
  };

  const handleSubmit = () => {
    // Add form submission logic here
    alert('Relationship added!');
    // Optionally, navigate to another page upon successful submission
    navigate('/add-suspect-form');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-purple-600">Add Relationship to Victim</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          {/* Select Victims */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Select Victim(*)</label>
            <select
              name="victim"
              value={relationshipData.victim}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
              required
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Victim 1">Victim 1</option>
              <option value="Victim 2">Victim 2</option>
            </select>
          </div>

          {/* Relative / Non Relative */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Relative / Non Relative</label>
            <select
              name="relativeStatus"
              value={relationshipData.relativeStatus}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Relative">Relative</option>
              <option value="Non Relative">Non Relative</option>
            </select>
          </div>

          {/* Relationship to the Victim */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Relationship to the Victim</label>
            <select
              name="relationshipToVictim"
              value={relationshipData.relationshipToVictim}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Nothing selected">Nothing selected</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunt">Aunt</option>
              <option value="Friend">Friend</option>
            </select>
          </div>

          {/* Suspect Lives with Victim */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">Suspect Lives with Victim</label>
            <select
              name="suspectLivesWithVictim"
              value={relationshipData.suspectLivesWithVictim}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="Living in Same Place">Living in Same Place</option>
              <option value="Different Places">Different Places</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md w-full sm:w-auto"
          >
            Submit
          </button>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-md w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSuspectVictimRelationshipForm;
