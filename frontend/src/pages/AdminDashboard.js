import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Container, Grid, Card, CardContent, Typography,
  TextField, Select, MenuItem, FormControl, InputLabel,
  InputAdornment, Chip, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Stack, Button, IconButton, Tooltip, Dialog,
  DialogTitle, DialogContent, DialogActions, Divider, Snackbar,
} from '@mui/material';
import AssignmentIcon    from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AutorenewIcon     from '@mui/icons-material/Autorenew';
import CheckCircleIcon   from '@mui/icons-material/CheckCircle';
import SearchIcon        from '@mui/icons-material/Search';
import FilterListIcon    from '@mui/icons-material/FilterList';
import DeleteIcon        from '@mui/icons-material/Delete';
import InfoOutlinedIcon  from '@mui/icons-material/InfoOutlined';
import CloseIcon         from '@mui/icons-material/Close';
import EditNoteIcon      from '@mui/icons-material/EditNote';
import ConstructionIcon  from '@mui/icons-material/Construction';
import WaterDropIcon     from '@mui/icons-material/WaterDrop';
import BoltIcon          from '@mui/icons-material/Bolt';
import DeleteSweepIcon   from '@mui/icons-material/DeleteSweep';
import PersonIcon        from '@mui/icons-material/Person';

import { getAllComplaints, updateComplaintStatus, deleteComplaint } from '../services/api';
import Navbar from '../components/Navbar';
import { formatDate, timeAgo } from '../utils/dateUtils';

// ── Constants ──────────────────────────────────────────────
const STATUSES   = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
const CATEGORIES = ['ROAD', 'WATER', 'ELECTRICITY', 'SANITATION'];

const CATEGORY_META = {
  ROAD:        { label: 'रस्ता / Road',           icon: <ConstructionIcon sx={{ fontSize: 13 }} />, color: '#E53935', bg: '#FFEBEE' },
  WATER:       { label: 'पाणी / Water',           icon: <WaterDropIcon    sx={{ fontSize: 13 }} />, color: '#1565C0', bg: '#E3F2FD' },
  ELECTRICITY: { label: 'वीज / Electricity',     icon: <BoltIcon         sx={{ fontSize: 13 }} />, color: '#F57F17', bg: '#FFFDE7' },
  SANITATION:  { label: 'स्वच्छता / Sanitation', icon: <DeleteSweepIcon  sx={{ fontSize: 13 }} />, color: '#2E7D32', bg: '#E8F5E9' },
};

const STATUS_META = {
  PENDING:     { label: 'प्रलंबित',     en: 'Pending',     color: '#F57F17', bg: '#FFF8E1', muiColor: 'warning' },
  IN_PROGRESS: { label: 'प्रगतीपथावर', en: 'In Progress', color: '#0277BD', bg: '#E1F5FE', muiColor: 'info'    },
  RESOLVED:    { label: 'निराकरण',      en: 'Resolved',    color: '#2E7D32', bg: '#E8F5E9', muiColor: 'success' },
};

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
        fontWeight: 600, fontSize: '0.68rem',
        '& .MuiChip-icon': { color: m.color },
      }}
    />
  );
}

function StatusChip({ status }) {
  const m = STATUS_META[status] || { label: status, color: '#555', bg: '#eee' };
  return (
    <Chip
      label={`${m.label} / ${m.en}`}
      size="small"
      sx={{
        bgcolor: m.bg, color: m.color,
        border: `1px solid ${m.color}44`,
        fontWeight: 700, fontSize: '0.68rem',
      }}
    />
  );
}

function StatCard({ icon, number, label, labelMr, borderColor, bgColor }) {
  return (
    <Card sx={{ borderLeft: `5px solid ${borderColor}`, height: '100%' }}>
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: borderColor }}>
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

// ── Main Component ──────────────────────────────────────────
export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [message, setMessage]       = useState({ text: '', type: 'success' });
  const [selected, setSelected]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filters
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('ALL');
  const [catFilter, setCatFilter] = useState('ALL');

  const fetchAll = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const counts = useMemo(() => ({
    total:      complaints.length,
    pending:    complaints.filter(c => c.status === 'PENDING').length,
    inProgress: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved:   complaints.filter(c => c.status === 'RESOLVED').length,
  }), [complaints]);

  const filtered = useMemo(() => complaints.filter(c => {
    const matchSearch = !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.citizenName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'ALL' || c.status === filter;
    const matchCat    = catFilter === 'ALL' || c.category === catFilter;
    return matchSearch && matchStatus && matchCat;
  }), [complaints, search, filter, catFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      setMessage({ text: `तक्रार #${id} स्थिती ${status} वर अद्यतनित केली / Complaint #${id} updated to ${status}`, type: 'success' });
      fetchAll();
      setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteComplaint(deleteTarget);
      setMessage({ text: `तक्रार #${deleteTarget} हटवली / Complaint #${deleteTarget} deleted`, type: 'success' });
      setDeleteTarget(null);
      fetchAll();
      setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
    } catch (e) {
      setMessage({ text: 'Delete failed', type: 'error' });
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 90px)', pb: 6 }}>
        <Container maxWidth="xl" sx={{ pt: 3 }}>

          {/* ── Banner ── */}
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #1A237E 0%, #283593 70%, #303F9F 100%)',
              borderRadius: 3, px: { xs: 2.5, sm: 4 }, py: { xs: 2, sm: 2.5 },
              mb: 3, borderLeft: '5px solid #FF9933',
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem' }, fontWeight: 800, color: '#FFFFFF' }}>
              प्रशासक डॅशबोर्ड / Admin Dashboard 🛠️
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', mt: 0.3 }}>
              सर्व नागरिक तक्रारी व्यवस्थापित करा | Manage all citizen complaints and update resolution status
            </Typography>
          </Paper>

          {/* ── Snackbar Alert ── */}
          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ text: '', type: 'success' })}>
              {message.text}
            </Alert>
          )}

          {/* ── Stats ── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { icon: <AssignmentIcon />,     number: counts.total,      label: 'Total Complaints',   labelMr: 'एकूण तक्रारी',    borderColor: '#003580', bgColor: '#E8EEF8' },
              { icon: <HourglassEmptyIcon />, number: counts.pending,    label: 'Pending',            labelMr: 'प्रलंबित',        borderColor: '#F57F17', bgColor: '#FFF8E1' },
              { icon: <AutorenewIcon />,      number: counts.inProgress, label: 'In Progress',        labelMr: 'प्रगतीपथावर',     borderColor: '#0277BD', bgColor: '#E1F5FE' },
              { icon: <CheckCircleIcon />,    number: counts.resolved,   label: 'Resolved',           labelMr: 'निराकरण झाले',    borderColor: '#2E7D32', bgColor: '#E8F5E9' },
            ].map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>

          {/* ── Filters ── */}
          <Paper elevation={0} sx={{ bgcolor: '#F5F7FA', border: '1px solid #E0E7F0', borderRadius: 2, p: 2, mb: 2.5 }}>
            <Grid container spacing={1.5} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small" fullWidth
                  placeholder="तक्रार / नागरिक शोधा... / Search complaints or citizen..."
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
              <Grid item xs={6} sm={3}>
                <FormControl size="small" fullWidth sx={{ bgcolor: 'white' }}>
                  <InputLabel>स्थिती / Status</InputLabel>
                  <Select value={filter} label="स्थिती / Status" onChange={e => setFilter(e.target.value)}>
                    <MenuItem value="ALL">सर्व / All</MenuItem>
                    {STATUSES.map(s => (
                      <MenuItem key={s} value={s}>{STATUS_META[s]?.label} / {STATUS_META[s]?.en}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl size="small" fullWidth sx={{ bgcolor: 'white' }}>
                  <InputLabel>श्रेणी / Category</InputLabel>
                  <Select value={catFilter} label="श्रेणी / Category" onChange={e => setCatFilter(e.target.value)}>
                    <MenuItem value="ALL">सर्व / All</MenuItem>
                    {CATEGORIES.map(c => (
                      <MenuItem key={c} value={c}>{CATEGORY_META[c]?.label || c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="body2" sx={{ color: '#78909C', textAlign: { sm: 'right' } }}>
                  <strong>{filtered.length}</strong> / {complaints.length} तक्रारी
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* ── Table ── */}
          <Card>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #E8EEF8', display: 'flex', alignItems: 'center', gap: 1 }}>
                <EditNoteIcon sx={{ color: '#003580' }} />
                <Typography variant="h6" sx={{ color: '#003580', fontWeight: 700 }}>
                  सर्व तक्रारी / All Complaints
                </Typography>
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress sx={{ color: '#003580' }} />
                </Box>
              ) : filtered.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8, color: '#78909C' }}>
                  <AssignmentIcon sx={{ fontSize: 56, opacity: 0.3, mb: 1 }} />
                  <Typography variant="h6" sx={{ color: '#90A4AE', fontWeight: 600 }}>
                    कोणत्याही तक्रारी आढळल्या नाहीत / No complaints found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0BEC5', mt: 0.5 }}>
                    Try adjusting the filters above.
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['#', 'Title / शीर्षक', 'Category / श्रेणी', 'Citizen / नागरिक', 'Status / स्थिती', 'Update Status', 'Submitted / सादर', 'Actions'].map(h => (
                          <TableCell key={h} sx={{ fontWeight: 700, color: '#003580', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.4px', py: 1.5, bgcolor: '#E8EEF8' }}>
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filtered.map(c => (
                        <TableRow
                          key={c.id}
                          sx={{
                            borderLeft: `4px solid ${STATUS_META[c.status]?.color || '#003580'}`,
                            '&:hover': { bgcolor: '#F5F8FF' },
                          }}
                        >
                          <TableCell sx={{ fontWeight: 700, color: '#003580', fontSize: '0.82rem' }}>
                            #{c.id}
                          </TableCell>
                          <TableCell sx={{ maxWidth: 220 }}>
                            <Typography sx={{ fontWeight: 600, color: '#1A237E', fontSize: '0.85rem', lineHeight: 1.3 }}>
                              {c.title}
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: '#90A4AE', mt: 0.3,
                              overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {c.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <CategoryChip cat={c.category} />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                              <PersonIcon sx={{ fontSize: 15, color: '#78909C' }} />
                              <Box>
                                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#37474F' }}>
                                  {c.citizenName}
                                </Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#90A4AE' }}>
                                  {c.citizenEmail}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StatusChip status={c.status} />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={c.status}
                              size="small"
                              onChange={e => handleStatusChange(c.id, e.target.value)}
                              sx={{
                                fontSize: '0.78rem', minWidth: 130,
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: `${STATUS_META[c.status]?.color}55`,
                                },
                                bgcolor: STATUS_META[c.status]?.bg,
                                color: STATUS_META[c.status]?.color,
                                fontWeight: 700,
                              }}
                            >
                              {STATUSES.map(s => (
                                <MenuItem key={s} value={s} sx={{ fontSize: '0.78rem' }}>
                                  {STATUS_META[s]?.label} / {STATUS_META[s]?.en}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ fontSize: '0.75rem', color: '#546E7A', fontWeight: 500 }}>
                              {formatDate(c.createdAt)}
                            </Typography>
                            <Typography sx={{ fontSize: '0.68rem', color: '#90A4AE', mt: 0.2 }}>
                              {timeAgo(c.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5}>
                              <Tooltip title="View Details / तपशील पहा" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => setSelected(c)}
                                  sx={{ color: '#003580', '&:hover': { bgcolor: '#E8EEF8' } }}
                                >
                                  <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete / हटवा" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => setDeleteTarget(c.id)}
                                  sx={{ color: '#B71C1C', '&:hover': { bgcolor: '#FFEBEE' } }}
                                >
                                  <DeleteIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* ── Detail Modal ── */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selected && (
          <>
            <DialogTitle sx={{ background: 'linear-gradient(135deg, #1A237E, #283593)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', color: '#FFD580', fontWeight: 600, letterSpacing: 1 }}>
                  तक्रार तपशील / COMPLAINT DETAILS
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 800 }}>{selected.title}</Typography>
              </Box>
              <IconButton onClick={() => setSelected(null)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 2.5 }}>
              <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
                <CategoryChip cat={selected.category} />
                <StatusChip status={selected.status} />
              </Stack>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#003580', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                वर्णन / Description
              </Typography>
              <Typography variant="body2" sx={{ color: '#37474F', lineHeight: 1.7, mt: 0.5, mb: 2 }}>
                {selected.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={1.5}>
                {[
                  { label: 'Complaint ID', value: `#${selected.id}` },
                  { label: 'Category / श्रेणी', value: selected.category },
                  { label: 'Citizen / नागरिक', value: selected.citizenName },
                  { label: 'Email', value: selected.citizenEmail },
                  { label: 'Submitted / सादर', value: formatDate(selected.createdAt) },
                  { label: 'Last Updated', value: formatDate(selected.updatedAt) },
                ].map((item, i) => (
                  <Grid item xs={6} key={i}>
                    <Box sx={{ bgcolor: '#F5F7FA', borderRadius: 1.5, p: 1.2 }}>
                      <Typography variant="caption" sx={{ color: '#78909C', fontWeight: 600, fontSize: '0.66rem', textTransform: 'uppercase', display: 'block' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A237E', mt: 0.3, fontSize: '0.82rem', wordBreak: 'break-all' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setSelected(null)} variant="outlined" sx={{ borderColor: '#B0BEC5', color: '#546E7A' }}>
                बंद करा / Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Delete Confirm ── */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ color: '#B71C1C', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteIcon /> तक्रार हटवा / Delete Complaint
        </DialogTitle>
        <DialogContent>
          <Typography>
            तक्रार <strong>#{deleteTarget}</strong> कायमची हटवायची आहे का? ही क्रिया पूर्ववत होणार नाही.
          </Typography>
          <Typography variant="body2" sx={{ color: '#78909C', mt: 0.5 }}>
            Are you sure you want to permanently delete complaint #{deleteTarget}? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ fontWeight: 700 }}
          >
            हो, हटवा / Yes, Delete
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDeleteTarget(null)}
            sx={{ borderColor: '#B0BEC5', color: '#546E7A' }}
          >
            रद्द करा / Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Footer ── */}
      <Box component="footer" sx={{ background: 'linear-gradient(135deg, #001F4D, #003580)', color: 'white', textAlign: 'center', py: 2.5, px: 2 }}>
        <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
          नागरिक तक्रार प्रणाली — प्रशासक पोर्टल | Admin Portal
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', mt: 0.4 }}>
          © {new Date().getFullYear()} महाराष्ट्र शासन | Government of Maharashtra
        </Typography>
      </Box>
    </>
  );
}
