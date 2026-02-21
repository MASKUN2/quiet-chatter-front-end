import React from 'react';
import { Container, Typography, Paper, useTheme, useMediaQuery, Box, Stack } from '@mui/material';
import Header from '../components/common/Header';
import RecommendedTalks from '../components/home/RecommendedTalks';
import UpdateLog from '../components/home/UpdateLog';
import RecommendedTalksTimer from '../components/home/RecommendedTalksTimer';
import { useHomeData } from '../hooks/useHomeData';

const Home: React.FC = () => {
  const { talks, books, loading, isRefreshing, refreshData, error } = useHomeData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" disableGutters={isMobile}>
      <Stack spacing={{ xs: 2, md: 4 }}>
        <Header />

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
            {/* Prevent timer from rendering if initial load failed or is still loading full page */}
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
    </Container>
  );
};

export default Home;
