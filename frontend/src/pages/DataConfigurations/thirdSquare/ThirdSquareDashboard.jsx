import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar'; // Same Navbar component as in other dashboards

function ThirdSquareDashboard() {
  const navigate = useNavigate();

  // Navigation handlers for each card
  const handleBasicOffenceTypesClick = () => {
    navigate('/basic-offence-types');
  };

  const handleMainOffenceTypesClick = () => {
    navigate('/main-offence-types');
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
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Third Square Dashboard</h1>

      {/* Cards Section */}
      <div className="bg-[#2d3e50cc] p-6 shadow-md rounded-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-0">
          {/* Basic Offence Types Card */}
          <div
            onClick={handleBasicOffenceTypesClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Basic Offence Types</h3>
          </div>

          {/* Main Offence Types Card */}
          <div
            onClick={handleMainOffenceTypesClick}
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Main Offence Types</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdSquareDashboard;