import React from 'react';
import { Paper, TextField, Box, Button } from '@mui/material';

interface TalkFormProps {
  content: string;
  setContent: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TalkForm: React.FC<TalkFormProps> = ({ content, setContent, onSubmit }) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 4, bgcolor: 'background.default' }}>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="이 책에 대한 생각을 자유롭게 남겨주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          sx={{ mb: 1, bgcolor: 'white' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={!content.trim()}>
            등록하기
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TalkForm;
