import React from 'react';
import { TextField, Box, Button, Typography, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface TalkFormProps {
  content: string;
  setContent: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  nickname?: string;
}

const TalkForm: React.FC<TalkFormProps> = ({ content, setContent, onSubmit, nickname }) => {
  const today = new Date().toLocaleDateString();

  return (
    <Box sx={{ 
      mb: 4, 
      mx: 0, 
      p: { xs: 2, sm: 2 }, 
      borderRadius: 2, 
      bgcolor: 'grey.50', 
      border: '1px solid', 
      borderColor: 'grey.200' 
    }}>
      <Stack direction="row" spacing={2} sx={{ mb: 1.5, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountCircleIcon fontSize="small" color="action" />
          <Typography variant="body2" fontWeight="bold">
            {nickname || '손님'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="caption">
            {today}
          </Typography>
        </Box>
      </Stack>

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="이 책에 대한 생각을 자유롭게 남겨주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          sx={{ mb: 2, bgcolor: 'white' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="outlined" 
            disabled={!content.trim()}
            sx={{ 
              px: 4,
              color: '#5c2d91',
              borderColor: '#5c2d91',
              '&:hover': {
                borderColor: '#4b0082',
                backgroundColor: 'rgba(92, 45, 145, 0.04)'
              },
              '&.Mui-disabled': {
                borderColor: 'rgba(0, 0, 0, 0.12)',
                color: 'rgba(0, 0, 0, 0.26)'
              }
            }}
          >
            Talk 등록
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TalkForm;
