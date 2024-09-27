import React, { useState } from 'react';
import API from '../api';

const AddListing = () => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    description: '',
    language: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/seller/addListing', formData);
      alert('Listing added successfully');
    } catch (error) {
      alert('Error adding listing');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="url" 
          placeholder="Image URL"
          value={formData.url} 
          onChange={handleChange} 
          className="w-full mb-4 px-4 py-2 border rounded"
          required 
        />
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={formData.title} 
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded" 
          required 
        />
        <input 
          type="text" 
          name="author" 
          placeholder="Author"
          value={formData.author} 
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required 
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price"
          value={formData.price} 
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded" 
          required 
        />
        <textarea 
          name="description" 
          placeholder="Description"
          value={formData.description} 
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded" 
          required 
        />
        <input 
          type="text" 
          name="language" 
          placeholder="Language"
          value={formData.language} 
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded" 
          required 
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
