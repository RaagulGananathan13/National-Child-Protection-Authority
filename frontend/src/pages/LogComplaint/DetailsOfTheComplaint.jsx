import React, { useState } from 'react';

function DetailsOfTheComplaint() {
  const [formData, setFormData] = useState({
    locationOfIncident: '',
    locationOfIncidentType: '', // Required in schema
    district: '',
    divisionalSecretariat: '',
    policeDivision: '',
    province: '',
    policeStation: '',
    residentialSector: 'Urban',
    gnDivision: '',
    incidentDate: '2025-02-21', // ISO format compatible
    incidentTime: '00:00', // Required in schema
    complaintInBrief: '',
    incidentAddress: '',
    cyCaseEvidenceLink: 'No',
    incidentRelatedLink: '',
    scannedDocuments: '',
    complaintNumber: '', // Added to formData
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, scannedDocuments: file ? file.name : '' });
  };

  const generateComplaintNumber = () => {
    // Simple unique complaint number generator (e.g., "COMP-YYYYMMDD-XXXX")
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase(); // Random 4 chars
    return `COMP-${dateStr}-${randomStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique complaint number
    const uniqueComplaintNumber = generateComplaintNumber();

    // Prepare data for the API
    const complaintData = {
      ...formData,
      receivedDate: new Date().toISOString().split('T')[0], // Default to today
      receivedTime: '00:00', // Default value
      complaintNumber: uniqueComplaintNumber, // Add unique complaint number
    };

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit complaint');
      }

      const result = await response.json();
      setMessage('Complaint submitted successfully!');
      // Reset form
      setFormData({
        locationOfIncident: '',
        locationOfIncidentType: '',
        district: '',
        divisionalSecretariat: '',
        policeDivision: '',
        province: '',
        policeStation: '',
        residentialSector: 'Urban',
        gnDivision: '',
        incidentDate: '2025-02-21',
        incidentTime: '00:00',
        complaintInBrief: '',
        incidentAddress: '',
        cyCaseEvidenceLink: 'No',
        incidentRelatedLink: '',
        scannedDocuments: '',
        complaintNumber: '', // Reset to empty
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Location Of Incident Type */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Location Of the Incident Type (*)
            </label>
            <select
              name="locationOfIncidentType"
              value={formData.locationOfIncidentType}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
              required
            >
              <option value="">Nothing selected</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>

          {/* Location of the Incident */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Location of the Incident</label>
            <select
              name="locationOfIncident"
              value={formData.locationOfIncident}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Location 1">Location 1</option>
              <option value="Location 2">Location 2</option>
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
            </select>
          </div>

          {/* Divisional Secretariat */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Divisional Secretariat</label>
            <select
              name="divisionalSecretariat"
              value={formData.divisionalSecretariat}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Divisional Secretariat 1">Divisional Secretariat 1</option>
              <option value="Divisional Secretariat 2">Divisional Secretariat 2</option>
            </select>
          </div>

          {/* Police Division */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Police Division</label>
            <select
              name="policeDivision"
              value={formData.policeDivision}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Police Division 1">Police Division 1</option>
              <option value="Police Division 2">Police Division 2</option>
            </select>
          </div>

          {/* Province */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
          </div>

          {/* Police Station */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Police Station</label>
            <select
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Nothing selected</option>
              <option value="Police Station 1">Police Station 1</option>
              <option value="Police Station 2">Police Station 2</option>
            </select>
          </div>

          {/* Incident Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Incident Date (*)</label>
            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Incident Time */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Incident Time (*)</label>
            <input
              type="time"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>
        </div>

        {/* Incident Address */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">Incident Address</label>
          <textarea
            name="incidentAddress"
            value={formData.incidentAddress}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
            rows="2"
            placeholder="Address"
          />
        </div>

        {/* G.N. Division */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">G.N. Division</label>
          <input
            type="text"
            name="gnDivision"
            value={formData.gnDivision}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Residential Sector */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">Residential Sector</label>
          <select
            name="residentialSector"
            value={formData.residentialSector}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        {/* Complaint in Brief */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">Complaint in Brief</label>
          <textarea
            name="complaintInBrief"
            value={formData.complaintInBrief}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
            rows="4"
            placeholder="Details"
          />
        </div>

        {/* If a CY Case Has Evidence Link */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">If a CY Case Has Evidence Link</label>
          <select
            name="cyCaseEvidenceLink"
            value={formData.cyCaseEvidenceLink}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Incident Related Link */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">Incident Related Link</label>
          <input
            type="text"
            name="incidentRelatedLink"
            value={formData.incidentRelatedLink}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Add Scanned Documents */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-1">Add Scanned Documents</label>
          <input
            type="file"
            name="scannedDocuments"
            onChange={handleFileChange}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailsOfTheComplaint;