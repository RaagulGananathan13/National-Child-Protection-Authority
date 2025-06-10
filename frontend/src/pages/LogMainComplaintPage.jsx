import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DetailsOfTheVictim from './LogComplaint/DetailsOfTheVictim';
import DetailsOfTheVictimsParent from './LogComplaint/DetailsOfTheVictimsParent';
import DetailsOfTheSuspect from './LogComplaint/DetailsOfTheSuspect';
import DetailsOfTheComplainant from './LogComplaint/DetailsOfTheComplainant';
import OfficerNotes from './LogComplaint/OfficerNotes';

function LogMainComplaintPage() {
  const [formData, setFormData] = useState({
    receivedDate: '',
    receivedTime: '',
    receivedMedium: '',
    complaintMedium: 'Sinhala',
    locationOfIncident: '',
    locationOfIncidentType: '',
    district: '',
    divisionalSecretariat: '',
    policeDivisionComplaint: '',
    province: '',
    policeStationComplaint: '',
    residentialSector: 'Urban',
    gnDivision: '',
    incidentDate: '2025-02-21',
    incidentTime: '00:00',
    complaintInBrief: '',
    incidentAddress: '',
    cyCaseEvidenceLink: 'No',
    incidentRelatedLink: '',
    scannedDocuments: null,
    policeDivision: '',
    policeStation: '',
    complaintLoggedDate: '2025-02-21',
    // complaintNumber: '', // Removed since it's auto-generated
    expectedRelief: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, scannedDocuments: e.target.files[0] });
  };

  const generateComplaintNumber = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `COMP-${dateStr}-${randomStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'scannedDocuments' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key] !== null && formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    // Use user-provided complaintNumber if available; otherwise, generate one
    const userComplaintNumber = formData.complaintNumber;
    const finalComplaintNumber = userComplaintNumber || generateComplaintNumber();
    formDataToSend.set('complaintNumber', finalComplaintNumber); // Use .set() to ensure single value
  
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Raw response:', text);
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
      }
  
      const result = await response.json();
      setMessage('Complaint submitted successfully!');
      setFormData({
        receivedDate: '',
        receivedTime: '',
        receivedMedium: '',
        complaintMedium: 'Sinhala',
        locationOfIncident: '',
        locationOfIncidentType: '',
        district: '',
        divisionalSecretariat: '',
        policeDivisionComplaint: '',
        province: '',
        policeStationComplaint: '',
        residentialSector: 'Urban',
        gnDivision: '',
        incidentDate: '2025-02-21',
        incidentTime: '00:00',
        complaintInBrief: '',
        incidentAddress: '',
        cyCaseEvidenceLink: 'No',
        incidentRelatedLink: '',
        scannedDocuments: null,
        policeDivision: '',
        policeStation: '',
        complaintLoggedDate: '2025-02-21',
        complaintNumber: '', // Keep this if you want to allow user input
        expectedRelief: '',
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Submission error:', error);
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'auto',
      }}
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-6 text-white">NCPA Complaint Handling Database</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          {/* Basic Information Section */}
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="receivedDate" className="block text-sm font-semibold text-gray-700">Received Date (*)</label>
              <input
                type="date"
                id="receivedDate"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="receivedTime" className="block text-sm font-semibold text-gray-700">Received Time (*)</label>
              <input
                type="time"
                id="receivedTime"
                name="receivedTime"
                value={formData.receivedTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="receivedMedium" className="block text-sm font-semibold text-gray-700">Received Medium (*)</label>
              <select
                id="receivedMedium"
                name="receivedMedium"
                value={formData.receivedMedium}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Nothing selected</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="In Person">In Person</option>
              </select>
            </div>

            <div>
              <label htmlFor="complaintMedium" className="block text-sm font-semibold text-gray-700">Complaint Medium</label>
              <select
                id="complaintMedium"
                name="complaintMedium"
                value={formData.complaintMedium}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {/* Details of the Complaint Section */}
          <h2 className="text-xl font-semibold mb-4 mt-6">Details of the Complaint</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Location Of the Incident Type(*)</label>
              <select
                name="locationOfIncidentType"
                value={formData.locationOfIncidentType}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Nothing selected</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Location of the incident</label>
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

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Police Division</label>
              <select
                name="policeDivisionComplaint"
                value={formData.policeDivisionComplaint}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Nothing selected</option>
                <option value="Police Division 1">Police Division 1</option>
                <option value="Police Division 2">Police Division 2</option>
              </select>
            </div>

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

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Police Station</label>
              <select
                name="policeStationComplaint"
                value={formData.policeStationComplaint}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Nothing selected</option>
                <option value="Police Station 1">Police Station 1</option>
                <option value="Police Station 2">Police Station 2</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Incident Date (*)</label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Incident Time (*)</label>
              <input
                type="time"
                name="incidentTime"
                value={formData.incidentTime}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

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

          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1">G.N.Division</label>
            <input
              type="text"
              name="gnDivision"
              value={formData.gnDivision}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
            />
          </div>

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

          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1">Complaint in brief</label>
            <textarea
              name="complaintInBrief"
              value={formData.complaintInBrief}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md text-sm"
              rows="4"
              placeholder="Details"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1">If a CY case has evidence Link</label>
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

          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1">Add Scanned documents</label>
            <input
              type="file"
              name="scannedDocuments"
              onChange={handleFileChange}
              className="px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">Has complaint been lodged with the Police in this regard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Police Division</label>
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

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Police Station</label>
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

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Complaint Logged Date</label>
              <input
                type="date"
                name="complaintLoggedDate"
                value={formData.complaintLoggedDate}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Removed the complaintNumber input field since it's auto-generated */}
            {/* <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Complaint Number</label>
              <input
                type="text"
                name="complaintNumber"
                value={formData.complaintNumber}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
                placeholder="Enter complaint number"
              />
            </div> */}
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">Relief Expected from the National Child Protection Authority</h2>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2">Expected Relief</label>
            <select
              name="expectedRelief"
              value={formData.expectedRelief}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Nothing selected</option>
              <option value="Relief Type 1">Relief Type 1</option>
              <option value="Relief Type 2">Relief Type 2</option>
              <option value="Relief Type 3">Relief Type 3</option>
            </select>
          </div>

          {message && (
            <div className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <DetailsOfTheVictim />
      <DetailsOfTheVictimsParent />
      <DetailsOfTheSuspect />
      <DetailsOfTheComplainant />
      <OfficerNotes />
    </div>
  );
}

export default LogMainComplaintPage;