import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include auth token
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};

// College Services
export const getColleges = async (params) => {
  const response = await api.get('/colleges', { params });
  return response.data;
};

export const getCollegeById = async (id) => {
  const response = await api.get(`/colleges/${id}`);
  return response.data;
};

export const compareColleges = async (collegeIds) => {
  const response = await api.post('/compare', { collegeIds });
  return response.data;
};

// User Services
export const saveCollege = async (id) => {
  const response = await api.post(`/user/save/${id}`);
  return response.data;
};

export const getSavedColleges = async () => {
  const response = await api.get('/user/saved');
  return response.data;
};

export default api;
