import React, { useEffect, useState } from 'react';
import API from '../api';

const SellerListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await API.get('/seller/getSellerListings');
      setListings(response.data);
    };
    fetchListings();
  }, []);

  const handleRemove = async (id) => {
    try {
      await API.delete(`/seller/removeListing/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      alert('Error removing listing');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>
      {listings.length > 0 ? (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id} className="mb-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">{listing.title}</p>
                <p>{listing.price}</p>
              </div>
              <button 
                onClick={() => handleRemove(listing._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
};

export default SellerListings;