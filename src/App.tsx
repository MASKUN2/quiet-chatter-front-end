import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Match original bootstrap primary if desired, or let MUI default
    },
    background: {
      default: '#f8f9fa',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books/search" element={<BookSearch />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
