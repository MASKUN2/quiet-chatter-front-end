import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { loginWithNaver } from '../api/api';

const NaverCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      loginWithNaver(code, state)
        .then(() => {
          // 로그인 성공 시 홈으로 이동 (쿠키는 브라우저에서 관리됨)
          navigate('/home', { replace: true });
        })
        .catch((error) => {
          console.error('Naver login failed:', error);
          alert('네이버 로그인에 실패했습니다.');
          navigate('/home', { replace: true });
        });
    } else {
      navigate('/home', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <CircularProgress sx={{ color: '#5c2d91', mb: 2 }} />
      <Typography variant="body1">로그인 중입니다...</Typography>
    </Box>
  );
};

export default NaverCallback;
