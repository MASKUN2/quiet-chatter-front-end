import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Header from '../components/common/Header';
import RecommendedTalks from '../components/home/RecommendedTalks';
import UsageGuide from '../components/home/UsageGuide';
import UpdateLog from '../components/home/UpdateLog';
import { useHomeData } from '../hooks/useHomeData';

const Home: React.FC = () => {
  const { talks, books, loading, error } = useHomeData();

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Header />

      <Paper elevation={1} sx={{ p: 3, mt: 4, minHeight: 250, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          당신을 위한 북톡 <Typography component="span" variant="body2" color="textSecondary">BookTalk</Typography>
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
