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
          minHeight: 250,
          borderRadius: isMobile ? 0 : 2,
          borderBottom: isMobile ? '1px solid #eee' : 'none',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ px: isMobile ? 1 : 2, pt: isMobile ? 2 : 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', lineHeight: 1.4 }}>
                FOR YOU
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
                당신을 위한 북톡 <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>BookTalk</Typography>
              </Typography>
            </Box>
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
        </Box>
      </Paper>

      <UpdateLog />
    </Stack>
  );
};

export default Home;
