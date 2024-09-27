import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Update with your backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('sellerToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const checkAuth = async () => {
  try {
    const res = await API.get('/seller/verifyToken');
    return res.data; // Assuming this returns seller data if authenticated
  } catch (error) {
    return false;  // Token is invalid or expired
  }
};

export default API;