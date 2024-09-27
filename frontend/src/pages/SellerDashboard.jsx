import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import AddListing from './components/AddListing';
import SellerListings from './components/SellerListings';
import { checkAuth } from './api';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const navigate = useNavigate();

  useEffect(() => {
    const verifySeller = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    };
    verifySeller();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-grow p-6">
        {activeTab === 'listings' && <SellerListings />}
        {activeTab === 'add' && <AddListing />}
      </div>
    </div>
  );
};

export default SellerDashboard;
