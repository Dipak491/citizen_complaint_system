import React, { useState, useEffect } from 'react';
import { getAllComplaints, updateComplaintStatus, deleteComplaint } from '../services/api';
import Navbar from '../components/Navbar';
import { formatDate, timeAgo } from '../utils/dateUtils';  // ✅ add this import


const STATUSES = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];

function statusBadge(status) {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-inprogress', RESOLVED: 'badge-resolved' };
  return <span className={`badge ${map[status] || 'badge-pending'}`}>{status}</span>;
}

function categoryBadge(cat) {
  const map = { ROAD: 'badge-road', WATER: 'badge-water', ELECTRICITY: 'badge-electricity', SANITATION: 'badge-sanitation' };
  return <span className={`badge ${map[cat] || ''}`}>{cat}</span>;
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [filter,     setFilter]     = useState('ALL');
  const [catFilter,  setCatFilter]  = useState('ALL');
  const [message,    setMessage]    = useState('');

  const fetchAll = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data);
      setFiltered(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    let list = [...complaints];
    if (filter    !== 'ALL') list = list.filter(c => c.status   === filter);
    if (catFilter !== 'ALL') list = list.filter(c => c.category === catFilter);
    setFiltered(list);
  }, [filter, catFilter, complaints]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      setMessage(`Complaint #${id} updated to ${status}`);
      fetchAll();
      setTimeout(() => setMessage(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete complaint #${id}? This cannot be undone.`)) return;
    try {
      await deleteComplaint(id);
      setMessage(`Complaint #${id} deleted successfully`);
      fetchAll();
      setTimeout(() => setMessage(''), 2500);
    } catch (e) {
      console.error(e);
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
        <h1 className="page-title">Admin Dashboard 🛠️</h1>
        <p className="page-subtitle">Manage all citizen complaints and update their resolution status.</p>

        {message && <div className="alert alert-success">{message}</div>}

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

        {/* Filters */}
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label className="form-label" style={{ marginBottom: '0.3rem' }}>Filter by Status</label>
              <select className="status-select" style={{ fontSize: '0.875rem', padding: '0.45rem 0.8rem' }}
                value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="ALL">All Statuses</option>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label" style={{ marginBottom: '0.3rem' }}>Filter by Category</label>
              <select className="status-select" style={{ fontSize: '0.875rem', padding: '0.45rem 0.8rem' }}
                value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                <option value="ALL">All Categories</option>
                {['ROAD','WATER','ELECTRICITY','SANITATION'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              <span style={{ fontSize: '0.85rem', color: '#718096' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{complaints.length}</strong> complaints
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-title">All Complaints</div>
          {loading ? (
            <div className="spinner-wrapper"><div className="spinner"></div></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <h3>No complaints found</h3>
              <p>Try adjusting the filters above.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Citizen</th>
                    <th>Status</th>
                    <th>Update Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id}>
                      <td><strong>#{c.id}</strong></td>
                      <td>
                        <div style={{ fontWeight: 500, color: '#2D3748' }}>{c.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#A0AEC0', marginTop: '0.2rem' }}>
                          {c.description.length > 60 ? c.description.slice(0, 60) + '...' : c.description}
                        </div>
                      </td>
                      <td>{categoryBadge(c.category)}</td>
                      <td>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{c.citizenName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#A0AEC0' }}>{c.citizenEmail}</div>
                      </td>
                      <td>{statusBadge(c.status)}</td>
                      <td>
                        <select className="status-select"
                          value={c.status}
                          onChange={e => handleStatusChange(c.id, e.target.value)}>
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(c.id)}>
                          🗑 Delete
                        </button>
                      </td>


<td>
  <div style={{ fontSize: '0.82rem', color: '#4A5568' }}>
    {formatDate(c.createdAt)}
  </div>
  <div style={{ fontSize: '0.75rem', color: '#A0AEC0', marginTop: '0.2rem' }}>
    {timeAgo(c.createdAt)}
  </div>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
