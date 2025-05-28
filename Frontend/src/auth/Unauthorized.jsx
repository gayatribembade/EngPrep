import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-red-600">Unauthorized Access</h2>
        <p className="mb-4">
          You don't have permission to access this page. Only administrators can access this area.
        </p>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;