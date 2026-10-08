import { createTheme } from '@mui/material/styles';

/**
 * 포트폴리오 테마
 * - 화이트 배경 + 레드 포인트 + 블랙 카드
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F43B3B',
      dark: '#A30D0D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Abril Fatface", serif',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Abril Fatface", serif',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Abril Fatface", serif',
      lineHeight: 1.3,
    },
    overline: {
      fontFamily: '"Anton", sans-serif',
      letterSpacing: '0.08em',
    },
    button: {
      fontFamily: '"Anton", sans-serif',
      letterSpacing: '0.06em',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
