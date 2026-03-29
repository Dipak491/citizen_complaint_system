import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected route — redirects to login if not authenticated
function PrivateRoute({ children, role }) {
  const { auth } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  if (role && auth.role !== role) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={
        auth
          ? <Navigate to={auth.role === 'ADMIN' ? '/admin' : '/citizen'} />
          : <Navigate to="/login" />
      } />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/citizen"  element={
        <PrivateRoute role="CITIZEN"><CitizenDashboard /></PrivateRoute>
      } />
      <Route path="/admin"    element={
        <PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>
      } />
      <Route path="*"         element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
