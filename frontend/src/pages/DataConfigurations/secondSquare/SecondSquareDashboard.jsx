import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar'; // Same Navbar component as in FirstSquareDashboard.jsx

function SecondSquareDashboard() {
  const navigate = useNavigate();

  // Navigation handlers for each card
  const handleProvincialEducationDepartmentsClick = () => {
    navigate('/provincial-education-departments');
  };

  const handleEducationZonesClick = () => {
    navigate('/education-zones');
  };

  const handleSchoolTypesClick = () => {
    navigate('/school-types');
  };

  const handleSchoolsClick = () => {
    navigate('/schools');
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }} // Same background image as FirstSquareDashboard
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Second Square Dashboard</h1>

      {/* Cards Section */}
      <div className="bg-[#2d3e50cc] p-6 shadow-md rounded-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0">
          {/* Provincial Education Departments Card */}
          <div
            onClick={handleProvincialEducationDepartmentsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Provincial Education Departments</h3>
          </div>

          {/* Education Zones Card */}
          <div
            onClick={handleEducationZonesClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Education Zones</h3>
          </div>

          {/* School Types Card */}
          <div
            onClick={handleSchoolTypesClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">School Types</h3>
          </div>

          {/* Schools Card */}
          <div
            onClick={handleSchoolsClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Schools</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondSquareDashboard;