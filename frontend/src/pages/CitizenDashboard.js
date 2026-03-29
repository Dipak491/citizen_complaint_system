import React, { useState, useEffect } from 'react';
import { submitComplaint, getMyComplaints } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const CATEGORIES = ['ROAD', 'WATER', 'ELECTRICITY', 'SANITATION'];

function statusBadge(status) {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-inprogress', RESOLVED: 'badge-resolved' };
  return <span className={`badge ${map[status] || 'badge-pending'}`}>{status}</span>;
}

function categoryBadge(cat) {
  const map = { ROAD: 'badge-road', WATER: 'badge-water', ELECTRICITY: 'badge-electricity', SANITATION: 'badge-sanitation' };
  return <span className={`badge ${map[cat] || ''}`}>{cat}</span>;
}

export default function CitizenDashboard() {
  const { auth } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [tab, setTab]               = useState('list');
  const [form, setForm]             = useState({ title: '', description: '', category: 'ROAD' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');

  const fetchComplaints = async () => {
    try {
      const res = await getMyComplaints();
      setComplaints(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSubmitting(true);
    try {
      await submitComplaint(form);
      setSuccess('Complaint submitted successfully!');
      setForm({ title: '', description: '', category: 'ROAD' });
      fetchComplaints();
      setTimeout(() => { setSuccess(''); setTab('list'); }, 1500);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object' && !data.error) {
        setError(Object.values(data).join(' | '));
      } else {
        setError(data?.error || 'Failed to submit complaint.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const counts = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'PENDING').length,
    inProgress: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length,
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Welcome, {auth?.name} 👋</h1>
        <p className="page-subtitle">Manage your civic complaints and track their resolution status.</p>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card total">
            <span className="stat-number">{counts.total}</span>
            <span className="stat-label">Total Complaints</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">{counts.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card inprogress">
            <span className="stat-number">{counts.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card resolved">
            <span className="stat-number">{counts.resolved}</span>
            <span className="stat-label">Resolved</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab-btn ${tab === 'list' ? 'active' : ''}`} onClick={() => setTab('list')}>
            📋 My Complaints
          </button>
          <button className={`tab-btn ${tab === 'new' ? 'active' : ''}`} onClick={() => setTab('new')}>
            ➕ Submit New Complaint
          </button>
        </div>

        {/* Submit Form */}
        {tab === 'new' && (
          <div className="card">
            <div className="card-title">Submit New Complaint</div>
            {error   && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Complaint Title</label>
                <input className="form-control" name="title"
                  placeholder="e.g. Large pothole on main road" value={form.title}
                  onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" name="category"
                  value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" rows={4}
                  placeholder="Describe the issue in detail — location, severity, impact..."
                  value={form.description} onChange={handleChange} required />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary" type="submit" disabled={submitting}
                  style={{ width: 'auto', flex: 1 }}>
                  {submitting ? 'Submitting...' : '📤 Submit Complaint'}
                </button>
                <button className="btn btn-secondary btn-sm" type="button"
                  onClick={() => setTab('list')} style={{ flex: '0 0 auto', width: 'auto', padding: '0.65rem 1.2rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Complaints List */}
        {tab === 'list' && (
          <div className="card">
            <div className="card-title">My Complaints ({complaints.length})</div>
            {loading ? (
              <div className="spinner-wrapper"><div className="spinner"></div></div>
            ) : complaints.length === 0 ? (
              <div className="empty-state">
                <h3>No complaints yet</h3>
                <p>Click "Submit New Complaint" to report a civic issue.</p>
              </div>
            ) : (
              complaints.map(c => (
                <div className="complaint-item" key={c.id}>
                  <div className="complaint-header">
                    <span className="complaint-title">{c.title}</span>
                    <div className="complaint-badges">
                      {categoryBadge(c.category)}
                      {statusBadge(c.status)}
                    </div>
                  </div>
                  <p className="complaint-description">{c.description}</p>
                  <span className="complaint-meta">Complaint #{c.id}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
