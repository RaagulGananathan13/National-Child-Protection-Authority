import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar'; // Same Navbar component as in other dashboards

function SixthSquareDashboard() {
  const navigate = useNavigate();

  // Navigation handlers for each card
  const handlePoliceStationsClick = () => {
    navigate('/police-stations');
  };

  const handleRegionalOfficesClick = () => {
    navigate('/regional-offices');
  };

  const handleCourtsClick = () => {
    navigate('/courts');
  };

  const handleHeadOfficeSectionsClick = () => {
    navigate('/head-office-sections');
  };

  const handleVideoEvidenceRecordUnitsClick = () => {
    navigate('/video-evidence-record-units');
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }} // Same background image as other dashboards
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Sixth Square Dashboard</h1>

      {/* Cards Section */}
      <div className="bg-[#2d3e50cc] p-6 shadow-md rounded-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-0">
          {/* Police Stations Card */}
          <div
            onClick={handlePoliceStationsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Police Stations</h3>
          </div>

          {/* Regional Offices Card */}
          <div
            onClick={handleRegionalOfficesClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Regional Offices</h3>
          </div>

          {/* Courts Card */}
          <div
            onClick={handleCourtsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Courts</h3>
          </div>

          {/* Head Office Sections Card */}
          <div
            onClick={handleHeadOfficeSectionsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Head Office Sections</h3>
          </div>

          {/* Video Evidence Record Units Card */}
          <div
            onClick={handleVideoEvidenceRecordUnitsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Video Evidence Record Units</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SixthSquareDashboard;