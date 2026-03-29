import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CITIZEN' });
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object' && !data.error) {
        setError(Object.values(data).join(' | '));
      } else {
        setError(data?.error || 'Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="chakra-symbol">☸</span>
          <h1>नागरिक तक्रार प्रणाली</h1>
          <div className="auth-logo-mr">Citizen Complaint Management System</div>
          <p>महाराष्ट्र शासन | Government of Maharashtra</p>
        </div>

        <h2 className="auth-title">नोंदणी करा / Create Account</h2>
        <p className="auth-subtitle">तक्रारी सादर करण्यासाठी नोंदणी करा / Register to submit complaints</p>

        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-control" type="text" name="name"
              placeholder="Enter your full name" value={form.name}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-control" type="email" name="email"
              placeholder="Enter your email" value={form.email}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password"
              placeholder="Minimum 6 characters" value={form.password}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Register As</label>
            <select className="form-control" name="role"
              value={form.role} onChange={handleChange}>
              <option value="CITIZEN">Citizen</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
