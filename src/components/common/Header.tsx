import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceOfCustomerModal from './VoiceOfCustomerModal';
import { 
  Box, TextField, Button, InputAdornment, Paper, 
  IconButton, Typography, Menu, MenuItem, useMediaQuery, useTheme,
  Skeleton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const { user, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleNaverLogin = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_NAVER_REDIRECT_URI);
    const state = Math.random().toString(36).substring(7); // 임시 state 생성
    
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const renderUserInfo = () => {
    // If loading and no cached user, show skeleton
    if (loading && !user) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>
      );
    }

    // If no user (and not loading, or even if loading failed), show login button
    if (!user || user.role === 'GUEST' || !user.isLoggedIn) {
      return (
        <Button 
          variant="outlined" 
          size="small" 
          onClick={handleNaverLogin}
          sx={{ 
            color: '#03C75A', 
            borderColor: '#03C75A',
            '&:hover': {
              borderColor: '#02b350',
              backgroundColor: 'rgba(3, 199, 90, 0.04)'
            },
            fontWeight: 600
          }}
        >
          네이버 로그인
        </Button>
      );
    }

    if (isMobile) {
      return (
        <>
          <IconButton
            size="small"
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountCircle fontSize="small" color="action" />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {user.nickname}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ 
          bgcolor: 'grey.100', 
          px: 1, 
          py: 0.2, 
          borderRadius: 1,
          color: 'text.secondary',
          fontWeight: 500
        }}>
          {user.role}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {/* Top Bar Area */}
      <Paper 
        elevation={isMobile ? 0 : 1} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          px: 2,
          py: 1,
          borderRadius: isMobile ? 0 : 2,
          backgroundColor: 'background.paper',
          minHeight: '56px',
          borderBottom: isMobile ? '1px solid #eee' : 'none'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VoiceOfCustomerModal />
        </Box>
        <Box>
          {renderUserInfo()}
        </Box>
      </Paper>

      {/* Main Search Area */}
      <Paper 
        elevation={isMobile ? 0 : 1} 
        sx={{ 
          p: isMobile ? 2 : 4, 
          mt: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : 2, 
          backgroundColor: 'background.paper',
          textAlign: 'center',
          borderBottom: isMobile ? '1px solid #eee' : 'none'
        }}
      >
        <Box sx={{ mb: 2 }}>
          <a href="/home" onClick={(e) => { e.preventDefault(); navigate('/home'); }} style={{ display: 'inline-block' }}>
            <img
              alt="Quiet Chatter Icon"
              src="/images/quiet-chatter-icon2.png"
              style={{ width: '180px', height: '180px', marginBottom: '1rem', objectFit: 'contain' }}
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
                          <Button 
                            type="submit" 
                            variant="outlined" 
                            size="large"
                            sx={{
                              whiteSpace: 'nowrap',
                              minWidth: 'auto',
                              px: 3,
                              borderRadius: 1,
                              color: '#5c2d91',
                              borderColor: '#5c2d91',
                              '&:hover': {
                                borderColor: '#4b0082',
                                backgroundColor: 'rgba(92, 45, 145, 0.04)',
                              }
                            }}
                          >
                            검색
                          </Button>          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Header;
