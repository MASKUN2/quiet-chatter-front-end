import React from 'react';
import { Typography, Paper, useTheme, useMediaQuery, Box, Stack } from '@mui/material';
import RecommendedTalks from '../components/home/RecommendedTalks';
import UpdateLog from '../components/home/UpdateLog';
import RecommendedTalksTimer from '../components/home/RecommendedTalksTimer';
import { useHomeData } from '../hooks/useHomeData';

const Home: React.FC = () => {
  const { talks, books, loading, isRefreshing, refreshData, error } = useHomeData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack spacing={{ xs: 2, md: 4 }}>
      <Paper
        elevation={isMobile ? 0 : 1}
        sx={{
          p: isMobile ? 1 : 2,
          minHeight: 250,
          borderRadius: isMobile ? 0 : 2,
          borderBottom: isMobile ? '1px solid #eee' : 'none'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Typography variant="h5" align="center">
            당신을 위한 북톡 <Typography component="span" variant="caption" color="textSecondary">BookTalk</Typography>
          </Typography>
          {!loading && !error && (
            <RecommendedTalksTimer
              onRefresh={refreshData}
              isRefreshing={isRefreshing}
              intervalMs={45000}
            />
          )}
        </Box>
        <RecommendedTalks
          loading={loading}
          error={error}
          talks={talks}
          books={books}
        />
      </Paper>

      <UpdateLog />
    </Stack>
  );
};

export default Home;
