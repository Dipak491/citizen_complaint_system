import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import govTheme from './theme/govTheme';

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
    <ThemeProvider theme={govTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
