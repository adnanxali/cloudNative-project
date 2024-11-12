// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Navigate to admin login page
  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  // Navigate to employee login page
  const handleEmployeeLogin = () => {
    navigate('/login');
  };

  // Navigate to employee registration page
  const handleEmployeeRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome!</h1>
      <p className="text-lg text-gray-600 mb-12">Choose your option:</p>
      
      <div className="space-y-6">
        <button
          onClick={handleAdminLogin}
          className="w-64 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Admin Login
        </button>
        
        <button
          onClick={handleEmployeeLogin}
          className="w-64 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Employee Login
        </button>
        
        <button
          onClick={handleEmployeeRegister}
          className="w-64 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
        >
          Register as Employee
        </button>
      </div>
    </div>
  );
};

export default HomePage;
