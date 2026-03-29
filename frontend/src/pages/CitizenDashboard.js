import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Container, Grid, Card, CardContent, CardActionArea,
  Typography, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, InputAdornment, Chip, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, Paper, Stack, IconButton, Tooltip, Snackbar,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import ConstructionIcon from '@mui/icons-material/Construction';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BoltIcon from '@mui/icons-material/Bolt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { submitComplaint, getMyComplaints } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { formatDate, timeAgo } from '../utils/dateUtils';

// ── Constants ──────────────────────────────────────────────
const CATEGORIES = ['ROAD', 'WATER', 'ELECTRICITY', 'SANITATION'];
const STATUSES   = ['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'];

const CATEGORY_META = {
  ROAD:        { label: 'रस्ता / Road',        icon: <ConstructionIcon sx={{ fontSize: 14 }} />, color: '#E53935', bg: '#FFEBEE' },
  WATER:       { label: 'पाणी / Water',        icon: <WaterDropIcon    sx={{ fontSize: 14 }} />, color: '#1565C0', bg: '#E3F2FD' },
  ELECTRICITY: { label: 'वीज / Electricity',  icon: <BoltIcon         sx={{ fontSize: 14 }} />, color: '#F57F17', bg: '#FFFDE7' },
  SANITATION:  { label: 'स्वच्छता / Sanitation', icon: <DeleteSweepIcon sx={{ fontSize: 14 }} />, color: '#2E7D32', bg: '#E8F5E9' },
};

const STATUS_META = {
  PENDING:     { label: 'प्रलंबित / Pending',        color: 'warning',  chipColor: '#F57F17', bg: '#FFF8E1' },
  IN_PROGRESS: { label: 'प्रगतीपथावर / In Progress', color: 'info',     chipColor: '#0277BD', bg: '#E1F5FE' },
  RESOLVED:    { label: 'निराकरण / Resolved',        color: 'success',  chipColor: '#2E7D32', bg: '#E8F5E9' },
};

// ── Sub-components ─────────────────────────────────────────
function StatCard({ icon, number, label, labelMr, borderColor, bgColor }) {
  return (
    <Card sx={{ borderLeft: `5px solid ${borderColor}`, height: '100%' }}>
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box
            sx={{
              width: 42, height: 42, borderRadius: '50%',
              bgcolor: bgColor, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: borderColor,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: borderColor, fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
            {number}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 700, color: '#1A237E', fontSize: '0.88rem' }}>{label}</Typography>
        <Typography sx={{ color: '#78909C', fontSize: '0.72rem' }}>{labelMr}</Typography>
      </CardContent>
    </Card>
  );
}

function CategoryChip({ cat }) {
  const m = CATEGORY_META[cat] || { label: cat, color: '#555', bg: '#eee', icon: null };
  return (
    <Chip
      icon={m.icon}
      label={m.label}
      size="small"
      sx={{
        bgcolor: m.bg, color: m.color,
        border: `1px solid ${m.color}33`,
        fontWeight: 600, fontSize: '0.7rem',
        '& .MuiChip-icon': { color: m.color },
      }}
    />
  );
}

function StatusChip({ status }) {
  const m = STATUS_META[status] || { label: status, chipColor: '#555', bg: '#eee' };
  return (
    <Chip
      label={m.label}
      size="small"
      sx={{
        bgcolor: m.bg, color: m.chipColor,
        border: `1px solid ${m.chipColor}44`,
        fontWeight: 700, fontSize: '0.7rem',
      }}
    />
  );
}

// ── Print Receipt ───────────────────────────────────────────
function printReceipt(complaint, userName) {
  const win = window.open('', '_blank', 'width=700,height=600');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Complaint Receipt - #${complaint.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #222; background: #fff; padding: 30px; }
        .header { text-align: center; border-bottom: 3px solid #003580; pb: 16px; margin-bottom: 20px; }
        .tricolor { display: flex; height: 6px; margin-bottom: 14px; }
        .tricolor div { flex: 1; }
        .chakra-row { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px; }
        .emblem { font-size: 40px; }
        .portal-title { font-size: 20px; font-weight: 800; color: #003580; }
        .portal-sub { font-size: 13px; color: #555; }
        .govt-name { font-size: 12px; color: #888; margin-top: 2px; }
        .receipt-title { text-align: center; background: #003580; color: white; padding: 10px; font-size: 15px; font-weight: 700; margin: 16px 0; border-radius: 6px; }
        .field-row { display: flex; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .field-label { width: 180px; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; flex-shrink: 0; }
        .field-value { font-size: 13px; color: #222; font-weight: 500; }
        .status-badge { display: inline-block; padding: 3px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .status-PENDING { background: #FFF8E1; color: #F57F17; border: 1px solid #F57F17; }
        .status-IN_PROGRESS { background: #E1F5FE; color: #0277BD; border: 1px solid #0277BD; }
        .status-RESOLVED { background: #E8F5E9; color: #2E7D32; border: 1px solid #2E7D32; }
        .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 12px; }
        .ref { text-align: center; font-size: 18px; font-weight: 800; color: #003580; margin: 10px 0; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="tricolor">
        <div style="background:#FF9933"></div>
        <div style="background:#FFFFFF;border-top:1px solid #ddd;border-bottom:1px solid #ddd"></div>
        <div style="background:#138808"></div>
      </div>
      <div class="header">
        <div class="chakra-row">
          <span class="emblem">☸</span>
          <div>
            <div class="portal-title">नागरिक तक्रार प्रणाली</div>
            <div class="portal-sub">Citizen Complaint Management System</div>
            <div class="govt-name">महाराष्ट्र शासन | Government of Maharashtra</div>
          </div>
        </div>
      </div>
      <div class="receipt-title">📄 तक्रार पावती / COMPLAINT RECEIPT</div>
      <div class="ref">Ref No: MH/CCS/${new Date().getFullYear()}/${String(complaint.id).padStart(5, '0')}</div>
      <br/>
      <div class="field-row">
        <div class="field-label">Complaint ID / तक्रार क्र.</div>
        <div class="field-value"><strong>#${complaint.id}</strong></div>
      </div>
      <div class="field-row">
        <div class="field-label">Title / शीर्षक</div>
        <div class="field-value">${complaint.title}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Category / श्रेणी</div>
        <div class="field-value">${complaint.category}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Status / स्थिती</div>
        <div class="field-value">
          <span class="status-badge status-${complaint.status}">${complaint.status.replace('_', ' ')}</span>
        </div>
      </div>
      <div class="field-row">
        <div class="field-label">Description / वर्णन</div>
        <div class="field-value">${complaint.description}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Citizen / नागरिक</div>
        <div class="field-value">${userName}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Submitted On / सादर केले</div>
        <div class="field-value">${formatDate(complaint.createdAt)}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Last Updated / शेवटचे अद्यतन</div>
        <div class="field-value">${formatDate(complaint.updatedAt)}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Print Date / मुद्रण दिनांक</div>
        <div class="field-value">${new Date().toLocaleString('en-IN')}</div>
      </div>
      <div class="footer">
        हे दस्तऐवज संगणकाद्वारे तयार केले आहे. | This is a computer-generated document.<br/>
        For queries, contact helpline: 1800-XXX-XXXX | ईमेल: support@maharashtra.gov.in
      </div>
      <script>window.onload = () => { window.print(); }<\/script>
    </body>
    </html>
  `);
  win.document.close();
}

// ── Main Component ──────────────────────────────────────────
export default function CitizenDashboard() {
  const { auth } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [tab, setTab]               = useState('list');
  const [form, setForm]             = useState({ title: '', description: '', category: 'ROAD' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');
  const [snackbar, setSnackbar]     = useState('');

  // Filters
  const [search, setSearch]         = useState('');
  const [catFilter, setCatFilter]   = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal
  const [selected, setSelected]     = useState(null);

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

  const counts = useMemo(() => ({
    total:      complaints.length,
    pending:    complaints.filter(c => c.status === 'PENDING').length,
    inProgress: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved:   complaints.filter(c => c.status === 'RESOLVED').length,
  }), [complaints]);

  const filtered = useMemo(() => complaints.filter(c => {
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === 'ALL' || c.category === catFilter;
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  }), [complaints, search, catFilter, statusFilter]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setSubmitting(true);
    try {
      await submitComplaint(form);
      setSuccess('तक्रार यशस्वीरित्या सादर केली! / Complaint submitted successfully!');
      setForm({ title: '', description: '', category: 'ROAD' });
      fetchComplaints();
      setTimeout(() => { setSuccess(''); setTab('list'); }, 2000);
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

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 90px)', pb: 6 }}>
        <Container maxWidth="lg" sx={{ pt: 3 }}>

          {/* ── Welcome Banner ── */}
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #001F4D 0%, #003580 70%, #0D47A1 100%)',
              borderRadius: 3,
              px: { xs: 2.5, sm: 4 },
              py: { xs: 2, sm: 2.5 },
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1.5,
              borderLeft: '5px solid #FF9933',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem' }, fontWeight: 800, color: '#FFFFFF' }}>
                नमस्कार, {auth?.name} 🙏
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', mt: 0.3 }}>
                Welcome &nbsp;|&nbsp; तुमच्या नागरिक तक्रारी व्यवस्थापित करा
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setTab('new')}
              sx={{
                bgcolor: '#FF9933',
                color: '#FFFFFF',
                fontWeight: 700,
                px: 2.5,
                '&:hover': { bgcolor: '#E67E00' },
              }}
            >
              नवीन तक्रार दाखल करा
            </Button>
          </Paper>

          {/* ── Stats Grid ── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { icon: <AssignmentIcon />, number: counts.total,      label: 'Total Complaints',   labelMr: 'एकूण तक्रारी',      borderColor: '#003580', bgColor: '#E8EEF8' },
              { icon: <HourglassEmptyIcon />, number: counts.pending, label: 'Pending',           labelMr: 'प्रलंबित',          borderColor: '#F57F17', bgColor: '#FFF8E1' },
              { icon: <AutorenewIcon />, number: counts.inProgress,   label: 'In Progress',       labelMr: 'प्रगतीपथावर',       borderColor: '#0277BD', bgColor: '#E1F5FE' },
              { icon: <CheckCircleIcon />, number: counts.resolved,   label: 'Resolved',          labelMr: 'निराकरण झाले',      borderColor: '#2E7D32', bgColor: '#E8F5E9' },
            ].map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>

          {/* ── Tab Buttons ── */}
          <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
            <Button
              variant={tab === 'list' ? 'contained' : 'outlined'}
              startIcon={<ListAltIcon />}
              onClick={() => setTab('list')}
              sx={{
                fontWeight: 700, borderRadius: 2,
                ...(tab === 'list'
                  ? { bgcolor: '#003580', '&:hover': { bgcolor: '#001F4D' } }
                  : { borderColor: '#003580', color: '#003580', '&:hover': { bgcolor: '#E8EEF8' } }),
              }}
            >
              माझ्या तक्रारी / My Complaints
            </Button>
            <Button
              variant={tab === 'new' ? 'contained' : 'outlined'}
              startIcon={<AddIcon />}
              onClick={() => setTab('new')}
              sx={{
                fontWeight: 700, borderRadius: 2,
                ...(tab === 'new'
                  ? { bgcolor: '#FF9933', '&:hover': { bgcolor: '#E67E00' } }
                  : { borderColor: '#FF9933', color: '#FF9933', '&:hover': { bgcolor: '#FFF8E1' } }),
              }}
            >
              नवीन तक्रार / New Complaint
            </Button>
          </Stack>

          {/* ══════════ COMPLAINT LIST ══════════ */}
          {tab === 'list' && (
            <Card>
              <CardContent sx={{ pb: 1 }}>

                {/* Section header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#003580', fontWeight: 700 }}>
                      माझ्या तक्रारी / My Complaints
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#78909C' }}>
                      {filtered.length} तक्रारी दाखवत आहे / Showing {filtered.length} complaints
                    </Typography>
                  </Box>
                </Box>

                {/* Search + Filters */}
                <Paper
                  elevation={0}
                  sx={{ bgcolor: '#F5F7FA', border: '1px solid #E0E7F0', borderRadius: 2, p: 2, mb: 2.5 }}
                >
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="तक्रार शोधा / Search complaints..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: '#78909C', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ bgcolor: 'white', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3.5}>
                      <FormControl size="small" fullWidth sx={{ bgcolor: 'white' }}>
                        <InputLabel sx={{ fontSize: '0.82rem' }}>
                          <FilterListIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                          श्रेणी / Category
                        </InputLabel>
                        <Select
                          value={catFilter}
                          label="श्रेणी / Category"
                          onChange={e => setCatFilter(e.target.value)}
                        >
                          <MenuItem value="ALL">सर्व / All</MenuItem>
                          {CATEGORIES.map(c => (
                            <MenuItem key={c} value={c}>
                              {CATEGORY_META[c]?.label || c}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3.5}>
                      <FormControl size="small" fullWidth sx={{ bgcolor: 'white' }}>
                        <InputLabel sx={{ fontSize: '0.82rem' }}>स्थिती / Status</InputLabel>
                        <Select
                          value={statusFilter}
                          label="स्थिती / Status"
                          onChange={e => setStatusFilter(e.target.value)}
                        >
                          {STATUSES.map(s => (
                            <MenuItem key={s} value={s}>
                              {s === 'ALL' ? 'सर्व / All' : STATUS_META[s]?.label || s}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>

                {/* List */}
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress sx={{ color: '#003580' }} />
                  </Box>
                ) : filtered.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6, color: '#78909C' }}>
                    <AssignmentIcon sx={{ fontSize: 56, opacity: 0.3, mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#90A4AE' }}>
                      अद्याप कोणत्याही तक्रारी नाहीत
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0BEC5', mt: 0.5 }}>
                      No complaints found. Click "New Complaint" to get started.
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={1.5}>
                    {filtered.map(c => (
                      <Paper
                        key={c.id}
                        elevation={0}
                        sx={{
                          border: '1.5px solid #E0E7F0',
                          borderLeft: `5px solid ${STATUS_META[c.status]?.chipColor || '#003580'}`,
                          borderRadius: 2,
                          p: { xs: 1.5, sm: 2 },
                          cursor: 'pointer',
                          transition: 'all 0.18s',
                          '&:hover': {
                            boxShadow: '0 4px 18px rgba(0,53,128,0.12)',
                            borderColor: STATUS_META[c.status]?.chipColor || '#003580',
                            transform: 'translateY(-1px)',
                          },
                        }}
                        onClick={() => setSelected(c)}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                          <Typography sx={{ fontWeight: 700, color: '#1A237E', fontSize: '0.95rem', flex: 1, minWidth: 0 }}>
                            {c.title}
                          </Typography>
                          <Stack direction="row" spacing={0.7} flexShrink={0}>
                            <CategoryChip cat={c.category} />
                            <StatusChip status={c.status} />
                          </Stack>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: '#546E7A', mt: 0.8, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                        >
                          {c.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#90A4AE', fontWeight: 600 }}>
                            तक्रार क्र. #{c.id}
                          </Typography>
                          <Stack direction="row" spacing={1.5}>
                            <Typography variant="caption" sx={{ color: '#90A4AE', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                              <AccessTimeIcon sx={{ fontSize: 12 }} />
                              <Tooltip title={formatDate(c.createdAt)} arrow placement="top">
                                <span>{timeAgo(c.createdAt)}</span>
                              </Tooltip>
                            </Typography>
                            {c.updatedAt && c.updatedAt !== c.createdAt && (
                              <Typography variant="caption" sx={{ color: '#90A4AE', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                                <UpdateIcon sx={{ fontSize: 12 }} />
                                <Tooltip title={formatDate(c.updatedAt)} arrow placement="top">
                                  <span>Updated {timeAgo(c.updatedAt)}</span>
                                </Tooltip>
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          )}

          {/* ══════════ SUBMIT FORM ══════════ */}
          {tab === 'new' && (
            <Card>
              <CardContent>
                {/* Form header */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #001F4D, #003580)',
                    borderRadius: 2,
                    px: 3, py: 2, mb: 3,
                  }}
                >
                  <Typography sx={{ color: '#FFD580', fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1 }}>
                    नवीन तक्रार
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
                    Submit New Complaint / नवीन तक्रार दाखल करा
                  </Typography>
                </Box>

                {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="तक्रारीचे शीर्षक / Complaint Title *"
                        name="title"
                        placeholder="उदा. मुख्य रस्त्यावर मोठे खड्डे / Large pothole on main road"
                        value={form.title}
                        onChange={handleChange}
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small" required>
                        <InputLabel>श्रेणी / Category *</InputLabel>
                        <Select
                          name="category"
                          value={form.category}
                          label="श्रेणी / Category *"
                          onChange={handleChange}
                        >
                          {CATEGORIES.map(c => (
                            <MenuItem key={c} value={c}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ color: CATEGORY_META[c]?.color }}>
                                  {CATEGORY_META[c]?.icon}
                                </Box>
                                {CATEGORY_META[c]?.label || c}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="वर्णन / Description *"
                        name="description"
                        placeholder="समस्येचे तपशीलवार वर्णन करा — स्थान, तीव्रता, परिणाम... / Describe the issue in detail — location, severity, impact..."
                        value={form.description}
                        onChange={handleChange}
                        required
                        helperText={`${form.description.length} characters`}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2.5 }} />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitting}
                      sx={{
                        flex: 1, py: 1.2, fontWeight: 700,
                        bgcolor: '#003580', '&:hover': { bgcolor: '#001F4D' },
                      }}
                    >
                      {submitting
                        ? <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                        : null}
                      {submitting ? 'सादर करत आहे...' : '📤 तक्रार सादर करा / Submit Complaint'}
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => setTab('list')}
                      sx={{ borderColor: '#78909C', color: '#546E7A', '&:hover': { bgcolor: '#ECEFF1' } }}
                    >
                      रद्द करा / Cancel
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>

      {/* ══════════ DETAIL MODAL ══════════ */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selected && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #001F4D, #003580)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: '#FFD580', fontWeight: 600, letterSpacing: 1 }}>
                  तक्रार तपशील / COMPLAINT DETAILS
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>
                  {selected.title}
                </Typography>
              </Box>
              <IconButton onClick={() => setSelected(null)} sx={{ color: 'rgba(255,255,255,0.7)', mt: -1 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5, pb: 1 }}>
              {/* Ref + Status row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#78909C', fontSize: '0.8rem' }}>
                  Ref: MH/CCS/{new Date().getFullYear()}/{String(selected.id).padStart(5, '0')}
                </Typography>
                <Stack direction="row" spacing={0.8}>
                  <CategoryChip cat={selected.category} />
                  <StatusChip status={selected.status} />
                </Stack>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Description */}
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#003580', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                वर्णन / Description
              </Typography>
              <Typography variant="body2" sx={{ color: '#37474F', lineHeight: 1.7, mt: 0.5, mb: 2.5 }}>
                {selected.description}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* Meta info grid */}
              <Grid container spacing={1.5}>
                {[
                  { label: 'तक्रार क्र. / Complaint ID', value: `#${selected.id}` },
                  { label: 'श्रेणी / Category',           value: selected.category },
                  { label: 'सादर केले / Submitted',       value: formatDate(selected.createdAt) },
                  { label: 'शेवटचे अद्यतन / Last Updated', value: formatDate(selected.updatedAt) },
                ].map((item, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ bgcolor: '#F5F7FA', borderRadius: 1.5, p: 1.2 }}>
                      <Typography variant="caption" sx={{ color: '#78909C', fontWeight: 600, fontSize: '0.68rem', textTransform: 'uppercase', display: 'block' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A237E', mt: 0.3, fontSize: '0.82rem' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Status timeline hint */}
              <Box
                sx={{
                  mt: 2.5, p: 1.5, borderRadius: 2,
                  bgcolor: STATUS_META[selected.status]?.bg || '#F5F7FA',
                  border: `1px solid ${STATUS_META[selected.status]?.chipColor || '#ccc'}22`,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: STATUS_META[selected.status]?.chipColor, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                  {selected.status === 'PENDING'     && 'तुमची तक्रार प्राप्त झाली आहे. लवकरच कारवाई केली जाईल. / Your complaint has been received.'}
                  {selected.status === 'IN_PROGRESS' && 'तुमच्या तक्रारीवर कारवाई सुरू आहे. / Your complaint is being addressed.'}
                  {selected.status === 'RESOLVED'    && 'तुमची तक्रार यशस्वीरित्या निराकरण केली गेली आहे. / Your complaint has been resolved.'}
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={() => printReceipt(selected, auth?.name)}
                sx={{ bgcolor: '#003580', '&:hover': { bgcolor: '#001F4D' }, fontWeight: 700 }}
              >
                पावती प्रिंट करा / Print Receipt
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelected(null)}
                sx={{ borderColor: '#B0BEC5', color: '#546E7A' }}
              >
                बंद करा / Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar('')}
        message={snackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* ── Official Footer ── */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #001F4D, #003580)',
          color: 'white',
          textAlign: 'center',
          py: 2.5,
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', height: 4, mb: 2, mx: 'auto', maxWidth: 200, borderRadius: 2, overflow: 'hidden' }}>
          {TRICOLOR.map((c, i) => <Box key={i} sx={{ flex: 1, bgcolor: c }} />)}
        </Box>
        <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
          नागरिक तक्रार प्रणाली &nbsp;|&nbsp; Citizen Complaint Management System
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', mt: 0.4 }}>
          © {new Date().getFullYear()} महाराष्ट्र शासन | Government of Maharashtra &nbsp;·&nbsp;
          सर्व हक्क राखीव | All Rights Reserved
        </Typography>
        <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', mt: 0.3 }}>
          Helpline: 1800-XXX-XXXX &nbsp;|&nbsp; support@maharashtra.gov.in
        </Typography>
      </Box>
    </>
  );
}

// Tricolor constant used in footer
const TRICOLOR = ['#FF9933', '#FFFFFF', '#138808'];
