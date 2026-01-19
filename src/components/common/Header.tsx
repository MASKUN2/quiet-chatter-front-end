import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceOfCustomerModal from './VoiceOfCustomerModal';
import { Box, TextField, Button, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books/search?keyword=${encodeURIComponent(keyword)}&page=1`);
    }
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        position: 'relative', 
        p: 4, 
        mt: 4, 
        borderRadius: 2, 
        backgroundColor: 'background.paper',
        textAlign: 'center'
      }}
    >
      <VoiceOfCustomerModal />

      <Box sx={{ mb: 2 }}>
        <a href="/home" onClick={(e) => { e.preventDefault(); navigate('/home'); }} style={{ display: 'inline-block' }}>
          <img
            alt="Quiet Chatter Icon"
            src="/images/quiet-chatter-icon2.png"
            style={{ width: '200px', height: '200px', marginBottom: '1rem', objectFit: 'contain' }}
          />
        </a>
      </Box>
      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', gap: 1, maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                px: 3,
                borderRadius: 1,
                backgroundColor: '#546e7a',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#455a64',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }
              }}
            >
              검색
            </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Header;
