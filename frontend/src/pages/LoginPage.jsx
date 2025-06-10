import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // change here

function LoginPage() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // change here

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('NIC:', nic);
    console.log('Password:', password);

    // On successful login, redirect to dashboard
    navigate('/dashboard'); // change here
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.jpg"
            alt="National Child Protection Authority Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">National Child Protection Authority</h1>
        <p className="text-center text-gray-500 mb-6">Enter your NIC number and password to login</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nic" className="block text-sm font-semibold text-gray-700">NIC Number</label>
            <input
              type="text"
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              placeholder="Enter your NIC number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          By logging in, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>

        <footer className="text-center text-sm text-gray-400 mt-4">
          <p>© 2025 National Child Protection Authority. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;
