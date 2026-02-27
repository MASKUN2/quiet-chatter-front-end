import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceOfCustomerModal from './VoiceOfCustomerModal';
import NaverLogin from './NaverLogin';
import {
  Box, TextField, Button, InputAdornment, Paper,
  IconButton, Typography, Menu, MenuItem, useMediaQuery, useTheme,
  Skeleton, Snackbar, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const { member, loading, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [toastOpen, setToastOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books/search?keyword=${encodeURIComponent(keyword)}&page=1`);
    }
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    setToastOpen(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const renderMemberInfo = () => {
    // If loading and no cached user, show skeleton
    if (loading && !member) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>
      );
    }

    // 로그인하지 않은 사용자(또는 로딩 실패 시)에게 로그인 버튼 노출
    if (!member || !member.isLoggedIn) {
      return (
        <NaverLogin height={32} />
      );
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountCircle fontSize="small" color="action" />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {member?.nickname}
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
          {member?.role === 'ADMIN' ? '관리자' : member?.role}
        </Typography>

        <IconButton
          size="small"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ ml: { xs: 0, sm: 0.5 } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); navigate('/home'); }}>홈</MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/mypage'); }}>마이페이지</MenuItem>
          <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        </Menu>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderMemberInfo()}
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
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(92, 45, 145, 0.04)',
                }
              }}
            >
              검색
            </Button>          </Box>
        </form>
      </Paper>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          로그아웃 되었습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Header;
