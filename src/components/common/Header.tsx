import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceOfCustomerModal from './VoiceOfCustomerModal';
import { 
  Box, TextField, Button, InputAdornment, Paper, 
  IconButton, Typography, Menu, MenuItem, useMediaQuery, useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getMe } from '../../api/api';
import type { User } from '../../types';

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getMe().then(setUser).catch(() => setUser(null));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books/search?keyword=${encodeURIComponent(keyword)}&page=1`);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderUserInfo = () => {
    if (!user || !user.isLoggedIn) return null;

    if (isMobile) {
      return (
        <>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user.nickname} ({user.role})</Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/home'); }}>홈</MenuItem>
          </Menu>
        </>
      );
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccountCircle fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {user.nickname}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ({user.role})
        </Typography>
      </Box>
    );
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
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        {renderUserInfo()}
      </Box>

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
