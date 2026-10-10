import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#b85e00',
      dark: '#8f4700',
      light: '#e08a2e',
      contrastText: '#fffdf4',
    },
    secondary: {
      main: '#f4e67e',
      dark: '#e8d75a',
      light: '#fff59e',
      contrastText: '#2b1d0c',
    },
    success: {
      main: '#b85e00',
      dark: '#8f4700',
      light: '#e08a2e',
    },
    background: {
      default: '#fffdf4',
      paper: '#ffffff',
    },
    text: {
      primary: '#2b1d0c',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition:
            'transform .15s ease, box-shadow .2s ease, background-color .2s ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0) scale(.97)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform .15s ease, background-color .2s ease',
          '&:hover': { transform: 'scale(1.12)' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600 },
      },
    },
  },
})

export default theme
