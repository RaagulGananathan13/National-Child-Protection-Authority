import React from 'react';
import { FaFileAlt, FaClipboardList, FaUsers, FaChild, FaCogs, FaChartLine, FaRegFileAlt, FaSearch } from 'react-icons/fa';
import { GiPoliceCar } from 'react-icons/gi';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogComplaintClick = () => {
    navigate('/log-main-complaint'); // Redirect to the Log Main Complaint page
  };

  const handleLawEnforcementClick = () => {
    navigate('/law-enforcement'); // Redirect to the Log Main Complaint page
  };

  const handleUpdateTaskClick = () => {
    navigate('/update-task'); // Redirect to the Update Task page
  };

  const handleUpdateSubTaskClick = () => {
    navigate('/update-subtask'); // Redirect to the Update Task page
  };

  const handleLogPoliceCaseClick = () => {
    navigate('/log-police-case'); // Redirect to the Update Task page
  };

  const handleLogVideoCaseClick = () => {
    navigate('/log-video-case'); // Redirect to the Update Task page
  };

  const handleVulnerableChildCaseClick = () => {
    navigate('/vulnerable-child-case'); // Redirect to the Update Task page
  };

  const handleMyComplaintsClick = () => {
    navigate('/my-complaints'); // Redirect to the Update Task page
  };

  const handleDataConfigurationsClick = () => {
    navigate('/data-configurations'); // Redirect to the Update Task page
  };
  

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Dashboard</h1>

      {/* Transparent dark blue container for the components */}
      <div className="bg-blue-800 bg-opacity-80 p-10 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Law Enforcement */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleLawEnforcementClick} // Add click event to navigate 
          >
            <div>
              <FaClipboardList className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Law Enforcement</h2>
            </div>
          </div>

          {/* Update Task */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleUpdateTaskClick} // Add click event to navigate 
          >
            <div>
              <FaChartLine className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Update Task</h2>
            </div>
          </div>

          {/* Update Sub Task */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleUpdateSubTaskClick} // Add click event to navigate
          >
            <div>
              <FaClipboardList className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Update Sub Task</h2>
            </div>
          </div>

          {/* Log Complaint - Add onClick to navigate */}
          <div
            className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer"
            onClick={handleLogComplaintClick} // Add click event to navigate
          >
            <div>
              <FaFileAlt className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Log Complaint</h2>
            </div>
          </div>

          {/* Log Police Case */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
           onClick={handleLogPoliceCaseClick} // Add click event to navigate
          >
            <div>
              <GiPoliceCar className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Log Police Case</h2>
            </div>
          </div>

          {/* Log Video Case */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleLogVideoCaseClick} // Add click event to navigate
          >
            <div>
              <MdOutlineVideoLibrary className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Log Video Case</h2>
            </div>
          </div>

          {/* Vulnerable Child Cases */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleVulnerableChildCaseClick} // Add click event to navigate
          >
            <div>
              <FaChild className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Vulnerable Child Cases</h2>
            </div>
          </div>

          {/* My Complaints */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleMyComplaintsClick} // Add click event to navigate
          >
            <div>
              <FaSearch className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">My Complaints</h2>
            </div>
          </div>

          {/* Dashboard I */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center">
            <div>
              <FaChartLine className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Dashboard I</h2>
            </div>
          </div>

          {/* Dashboard II */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center">
            <div>
              <FaChartLine className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Dashboard II</h2>
            </div>
          </div>

          {/* Vulnerable Dashboard */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center">
            <div>
              <FaChartLine className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Vulnerable Dashboard</h2>
            </div>
          </div>

          {/* Data Report */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center">
            <div>
              <FaRegFileAlt className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Data Report</h2>
            </div>
          </div>

          {/* User Configuration */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center">
            <div>
              <FaCogs className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">User Configuration</h2>
            </div>
          </div>

          {/* Data Configurations */}
          <div className="bg-white p-4 h-40 shadow-md rounded-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          onClick={handleDataConfigurationsClick} // Add click event to navigate
          >
            <div>
              <FaCogs className="text-2xl text-blue-600 mb-2" />
              <h2 className="text-base font-semibold text-center">Data Configurations</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
