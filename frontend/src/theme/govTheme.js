import { createTheme } from '@mui/material/styles';

const govTheme = createTheme({
  palette: {
    primary: {
      main: '#003580',
      light: '#1565C0',
      dark: '#001F4D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF9933',
      light: '#FFAD5C',
      dark: '#E67E00',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#138808',
      light: '#2ECC71',
      dark: '#0A5E06',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F57F17',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#EEF2F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A237E',
      secondary: '#546E7A',
    },
    // Custom tokens
    saffron: '#FF9933',
    indiaGreen: '#138808',
    indiaNavy: '#003580',
  },
  typography: {
    fontFamily: '"Noto Sans", "Roboto", "Segoe UI", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.3px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    body2: { fontSize: '0.85rem' },
    caption: { fontSize: '0.75rem' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,53,128,0.08)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#E8EEF8',
            color: '#003580',
            fontWeight: 700,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#F5F8FF' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#003580',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 14 },
      },
    },
  },
});

export default govTheme;
