import React from 'react';
import { Container, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/common/Header';
import RecommendedTalks from '../components/home/RecommendedTalks';
import UsageGuide from '../components/home/UsageGuide';
import UpdateLog from '../components/home/UpdateLog';
import { useHomeData } from '../hooks/useHomeData';

const Home: React.FC = () => {
  const { talks, books, loading, error } = useHomeData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Container maxWidth="md" disableGutters={isMobile} sx={{ pb: 6 }}>
        <Header />
  
              <Paper 
  
                elevation={isMobile ? 0 : 1} 
  
                sx={{ 
  
                  p: isMobile ? 1 : 2, 
  
                  mt: isMobile ? 2 : 4, 
  
                  minHeight: 250, 
  
                  borderRadius: isMobile ? 0 : 2,
  
                  borderBottom: isMobile ? '1px solid #eee' : 'none'
  
                }}
  
              >        <Typography variant="h5" align="center" gutterBottom>
          당신을 위한 북톡 <Typography component="span" variant="caption" color="textSecondary">BookTalk</Typography>
        </Typography>
        <RecommendedTalks 
            loading={loading} 
            error={error} 
            talks={talks} 
            books={books} 
        />
      </Paper>

      <UsageGuide />
      <UpdateLog />
    </Container>
  );
};

export default Home;
