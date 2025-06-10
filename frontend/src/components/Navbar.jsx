// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ userName }) {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo.jpg"
            alt="NCPA Logo"
            className="h-10 mr-2"
          />
          <div className="text-lg font-bold">NCPA Complaint Portal</div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-4 hover:underline">Home</Link>
          <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
          <Link to="/" className="hover:underline">Logout</Link>

          {/* Display Logged-In User's Name */}
          <div className="ml-4 text-sm font-semibold">
            {userName ? `Welcome, ${userName}` : 'Guest'}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
