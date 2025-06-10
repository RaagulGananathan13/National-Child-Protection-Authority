import React, { useState } from 'react';

const DetailsOfComplaint = () => {
  const [formData, setFormData] = useState({
    mainSubCategory: '',
    dateOfIncident: '',
    timeOfIncident: '',
    locationOfIncident: '',
    locationOfTheIncident: '', // added new field
    incidentAddress: '',
    gnDivision: '',
    divisionalSecretariat: '',
    residentialSector: '',
    complaintInBrief: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Complaint</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="mainSubCategory" className="block text-gray-700">Main Sub Category(*)</label>
          <select
            id="mainSubCategory"
            name="mainSubCategory"
            className="w-full p-2 border rounded"
            value={formData.mainSubCategory}
            onChange={handleChange}
          >
            <option value="">Nothing Selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="dateOfIncident" className="block text-gray-700">Date of Incident</label>
          <input
            type="date"
            id="dateOfIncident"
            name="dateOfIncident"
            className="w-full p-2 border rounded"
            value={formData.dateOfIncident}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="timeOfIncident" className="block text-gray-700">Time of Incident</label>
          <input
            type="time"
            id="timeOfIncident"
            name="timeOfIncident"
            className="w-full p-2 border rounded"
            value={formData.timeOfIncident}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="locationOfIncident" className="block text-gray-700">Location of the Incident Type(*)</label>
          <select
            id="locationOfIncident"
            name="locationOfIncident"
            className="w-full p-2 border rounded"
            value={formData.locationOfIncident}
            onChange={handleChange}
          >
            <option value="">Nothing Selected</option>
            {/* Add other options here */}
          </select>
        </div>

        {/* New Location of the Incident field */}
        <div>
          <label htmlFor="locationOfTheIncident" className="block text-gray-700">Location of the Incident</label>
          <input
            type="text"
            id="locationOfTheIncident"
            name="locationOfTheIncident"
            className="w-full p-2 border rounded"
            value={formData.locationOfTheIncident}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="incidentAddress" className="block text-gray-700">Incident Address</label>
          <input
            type="text"
            id="incidentAddress"
            name="incidentAddress"
            className="w-full p-2 border rounded"
            value={formData.incidentAddress}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="gnDivision" className="block text-gray-700">G.N. Division</label>
          <select
            id="gnDivision"
            name="gnDivision"
            className="w-full p-2 border rounded"
            value={formData.gnDivision}
            onChange={handleChange}
          >
            <option value="">Nothing Selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="divisionalSecretariat" className="block text-gray-700">Divisional Secretariat</label>
          <select
            id="divisionalSecretariat"
            name="divisionalSecretariat"
            className="w-full p-2 border rounded"
            value={formData.divisionalSecretariat}
            onChange={handleChange}
          >
            <option value="">Nothing Selected</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label htmlFor="residentialSector" className="block text-gray-700">Residential Sector</label>
          <select
            id="residentialSector"
            name="residentialSector"
            className="w-full p-2 border rounded"
            value={formData.residentialSector}
            onChange={handleChange}
          >
            <option value="">Nothing Selected</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div>
          <label htmlFor="complaintInBrief" className="block text-gray-700">Complaint in Brief</label>
          <textarea
            id="complaintInBrief"
            name="complaintInBrief"
            className="w-full p-2 border rounded"
            rows="4"
            value={formData.complaintInBrief}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsOfComplaint;
