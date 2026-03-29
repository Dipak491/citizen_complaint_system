import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────
export const registerUser  = (data) => api.post('/auth/register', data);
export const loginUser     = (data) => api.post('/auth/login', data);

// ── Complaints ────────────────────────────────────────────────
export const submitComplaint    = (data) => api.post('/complaints', data);
export const getMyComplaints    = ()     => api.get('/complaints/my');
export const getAllComplaints    = ()     => api.get('/complaints/all');
export const getComplaintById   = (id)   => api.get(`/complaints/${id}`);
export const updateComplaintStatus = (id, status) => api.put(`/complaints/${id}/status?status=${status}`);
export const deleteComplaint    = (id)   => api.delete(`/complaints/${id}`);

export default api;
