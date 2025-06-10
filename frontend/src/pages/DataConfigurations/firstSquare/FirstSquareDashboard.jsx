import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../../../components/Navbar';

function FirstSquareDashboard() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation to the Districts page
  const handleDistrictsClick = () => {
    navigate('/districts');
  };

  // Function to handle navigation to the Districts page
  const handleDivisionalSecretariats = () => {
    navigate('/divisional-secretariats');
  };

  const handleGNDivisionsClick = () => {
    navigate('/gn-divisions');
  };

  const handlePoliceDivisionsClick = () => {
    navigate('/police-divisions');
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">First Square Dashboard</h1>

      {/* Container with transparent dark blue background */}
      <div className="bg-[#2d3e50cc] p-6 shadow-md rounded-lg mb-6">
        {/* Grid of Buttons with no white space between buttons and transparent container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0">
          {/* Button 1: Districts */}
          <div
            onClick={handleDistrictsClick} // Add onClick handler for navigation
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
          >
            <h3 className="text-lg">Districts</h3>
          </div>

          {/* Button 2 */}
          <div
            onClick={handleDivisionalSecretariats} // Add onClick handler for navigation          
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Divisional Secretariats</h3>
          </div>

          {/* Button 3 */}
          <div
            onClick={handleGNDivisionsClick} // Add onClick handler for navigation   
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">GN Divisions</h3>
          </div>

          {/* Button 4 */}
          <div
          onClick={handlePoliceDivisionsClick} // Add onClick handler for navigation   
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Police Divisions</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstSquareDashboard;