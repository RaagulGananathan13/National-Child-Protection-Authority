import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Navbar from '../components/Navbar';

function DataConfigurations() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleFirstSquareDashboardClick = () => {
    navigate('/first-square-dashboard'); // Redirect to First Square Dashboard
  };

  const handleSecondSquareDashboardClick = () => {
    navigate('/second-square-dashboard'); // Redirect to Second Square Dashboard
  };

  const handleThirdSquareDashboardClick = () => {
    navigate('/third-square-dashboard'); // Redirect to Third Square Dashboard
  };

  const handleForthSquareDashboardClick = () => {
    navigate('/forth-square-dashboard'); // Redirect to Forth Square Dashboard
  };

  const handleSixthSquareDashboardClick = () => {
    navigate('/sixth-square-dashboard'); // Redirect to Sixth Square Dashboard
  };

  const handleSeventhSquareDashboardClick = () => {
    navigate('/seventh-square-dashboard'); // Redirect to Seventh Square Dashboard
  };

  const handleEighthSquareDashboardClick = () => {
    navigate('/eighth-square-dashboard'); // Redirect to Eighth Square Dashboard
  };

  return (
    <div className="p-6 bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('/images/background.jpg')` }}>
      
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">Data Configurations</h1>

      {/* Container with transparent dark blue background */}
      <div className="bg-[#2d3e50cc] p-6 shadow-md rounded-lg mb-6">
        {/* Grid of Buttons with no white space between buttons and transparent container */}
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-2 gap-4 p-0">
          {/* Button 1 */}
          <div
            className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
            onClick={handleFirstSquareDashboardClick} // Add click event to navigate 
          >
            <h3 className="text-lg">Districts/Divisional Secretariats/GN Divisions</h3>
          </div>

          {/* Button 2 */}
          <div
          onClick={handleThirdSquareDashboardClick} // Add click event to navigate
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Basic Offence Types/Main Types</h3>
          </div>

          {/* Button 3 */}
          <div className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Child Care Institute Types/Institutes</h3>
          </div>

          {/* Button 4 */}
          <div
          onClick={handleSeventhSquareDashboardClick} // Add click event to navigate
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Designations</h3>
          </div>

          {/* Button 5 */}
          <div className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors"
           onClick={handleSecondSquareDashboardClick} // Add click event to navigate 
          >
            <h3 className="text-lg">Provincial Education Departments / Education Zones / Divisions / Schools</h3>
          </div>

          {/* Button 6 */}
          <div
           onClick={handleForthSquareDashboardClick} // Add click event to navigate
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Vulnerability Types/Sub Types</h3>
          </div>

          {/* Button 7 */}
          <div
           onClick={handleSixthSquareDashboardClick} // Add click event to navigate
           className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Courts/Police Stations/Divisions/Regional Offices</h3>
          </div>

          {/* Button 8 */}
          <div
           onClick={handleEighthSquareDashboardClick} // Add click event to navigate
          className="bg-white p-6 rounded-lg text-black text-center cursor-pointer hover:bg-[#f1f1f1] transition-colors">
            <h3 className="text-lg">Mediums Of Complaints</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataConfigurations;
