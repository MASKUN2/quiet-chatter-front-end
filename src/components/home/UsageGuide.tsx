import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const UsageGuide: React.FC = () => {
  return (
    <Paper elevation={1} sx={{ p: 3, mt: 4, minHeight: 250, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" component="h3" align="center" gutterBottom>
        이렇게 사용해보세요 :)
      </Typography>
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        src="/images/사용시연2.mp4"
        sx={{
          width: '100%',
          maxWidth: '70%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: 1,
          display: 'block',
          mx: 'auto'
        }}
      />
    </Paper>
  );
};

export default UsageGuide;
