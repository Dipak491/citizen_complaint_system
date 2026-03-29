import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, Typography, Button, Chip,
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme, Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';
import AshokaChakra from './AshokaChakra';

const TRICOLOR = ['#FF9933', '#FFFFFF', '#138808'];

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* ── Tricolor strip ── */}
      <Box sx={{ display: 'flex', height: 6 }}>
        {TRICOLOR.map((color, i) => (
          <Box key={i} sx={{ flex: 1, backgroundColor: color }} />
        ))}
      </Box>

      {/* ── Government Identity Header ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #001F4D 0%, #003580 60%, #0D47A1 100%)',
          color: 'white',
          py: { xs: 1, sm: 1.5 },
          px: { xs: 2, sm: 3 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2.5 },
          borderBottom: '3px solid #FF9933',
        }}
      >
        {/* Ashoka Chakra */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
            p: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(255,255,255,0.2)',
            flexShrink: 0,
          }}
        >
          <AshokaChakra size={isMobile ? 36 : 46} />
        </Box>

        {/* Portal Titles */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              color: '#FFD580',
              fontWeight: 500,
              letterSpacing: '0.5px',
              lineHeight: 1.2,
            }}
          >
            महाराष्ट्र शासन &nbsp;|&nbsp; Government of Maharashtra
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              letterSpacing: '-0.2px',
            }}
          >
            नागरिक तक्रार प्रणाली
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.78rem' },
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
              lineHeight: 1.3,
            }}
          >
            Citizen Complaint Management System
          </Typography>
        </Box>

        {/* Right: User info + logout (desktop) */}
        {auth && !isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, justifyContent: 'flex-end' }}>
                <PersonIcon sx={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }} />
                <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  {auth.name}
                </Typography>
              </Box>
              <Chip
                label={auth.role === 'CITIZEN' ? 'नागरिक | CITIZEN' : 'प्रशासक | ADMIN'}
                size="small"
                sx={{
                  mt: 0.3,
                  height: 18,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  bgcolor: auth.role === 'CITIZEN' ? 'rgba(255,153,51,0.25)' : 'rgba(19,136,8,0.25)',
                  color: auth.role === 'CITIZEN' ? '#FFD580' : '#80FF80',
                  border: `1px solid ${auth.role === 'CITIZEN' ? '#FF9933' : '#138808'}`,
                  '& .MuiChip-label': { px: 0.8 },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon sx={{ fontSize: 15 }} />}
              onClick={handleLogout}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.35)',
                fontSize: '0.78rem',
                py: 0.6,
                px: 1.5,
                '&:hover': {
                  borderColor: '#FF9933',
                  bgcolor: 'rgba(255,153,51,0.15)',
                  color: '#FFD580',
                },
              }}
            >
              बाहेर पडा / Logout
            </Button>
          </Box>
        )}

        {/* Mobile hamburger */}
        {auth && isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: 'white', flexShrink: 0 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* ── Bottom accent bar ── */}
      <Box
        sx={{
          height: 3,
          background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)',
          opacity: 0.6,
        }}
      />

      {/* ── Mobile Drawer ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary">
              {auth?.name}
            </Typography>
            <Chip
              label={auth?.role === 'CITIZEN' ? 'नागरिक | CITIZEN' : 'प्रशासक | ADMIN'}
              size="small"
              color={auth?.role === 'CITIZEN' ? 'secondary' : 'success'}
              sx={{ mt: 0.5, fontWeight: 700 }}
            />
          </Box>
          <Divider />
          <List>
            <ListItem
              button
              onClick={handleLogout}
              sx={{ color: 'error.main' }}
            >
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              <ListItemText primary="बाहेर पडा / Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
