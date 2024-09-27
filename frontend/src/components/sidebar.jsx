import React from 'react';

const Sidebar = ({ setActiveTab, handleLogout }) => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Seller Dashboard</h2>
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <button 
            onClick={() => setActiveTab('listings')}
            className="text-gray-700 hover:bg-blue-500 hover:text-white block w-full text-left py-2 px-4 rounded"
          >
            View Listings
          </button>
        </li>
        <li>
          <button 
            onClick={() => setActiveTab('add')}
            className="text-gray-700 hover:bg-blue-500 hover:text-white block w-full text-left py-2 px-4 rounded"
          >
            Add Listing
          </button>
        </li>
        <li>
          <button 
            onClick={handleLogout}
            className="text-gray-700 hover:bg-red-500 hover:text-white block w-full text-left py-2 px-4 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;