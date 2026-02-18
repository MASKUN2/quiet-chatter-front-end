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

    console.log('Naver Login Callback params:', { code, state });

    if (code && state) {
      console.log('Attempting login with Naver code...');
      loginWithNaver(code, state)
        .then(() => {
          console.log('Naver login success');
          // 로그인 성공 시 홈으로 이동 (쿠키는 브라우저에서 관리됨)
          navigate('/home', { replace: true });
        })
        .catch((error) => {
          console.error('Naver login failed:', error);
          alert('네이버 로그인에 실패했습니다.');
          navigate('/home', { replace: true });
        });
    } else {
      console.warn('Missing code or state in callback');
      // If code/state is missing, check if they are in the hash (old flow fallback logging)
      const hash = window.location.hash;
      if (hash) {
        console.log('Found hash in URL:', hash);
        if (hash.includes('access_token')) {
          console.warn('Received access_token instead of code. Please ensure Naver SDK is configured with responseType: "code"');
        }
      }
      // Redirect back if no valid params found after a short delay to allow logs to be seen
      const timer = setTimeout(() => navigate('/home', { replace: true }), 2000);
      return () => clearTimeout(timer);
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
