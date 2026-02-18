import React from 'react';
import { Typography, Box, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { Book } from '../../types';

interface BookInfoProps {
  book: Book;
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={isMobile ? 0 : 1} 
      sx={{
        p: isMobile ? 2 : 4, 
        borderRadius: isMobile ? 0 : 2, 
        backgroundColor: 'background.paper',
        borderBottom: isMobile ? '1px solid #eee' : 'none'
      }}
    >

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          {book.thumbnailImageUrl ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src={book.thumbnailImageUrl} 
                alt={book.title} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '400px',
                  borderRadius: 4, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)' 
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ width: '100%', height: 300, bgcolor: 'grey.200', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No Image</Typography>
            </Box>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" gutterBottom color="text.primary">
            {book.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            저자: {book.author}
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            책 소개
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: 'text.primary' }}>
              {book.description}
            </Typography>
          </Box>
          
          {book.externalLinkUrl && (
            <Button 
              variant="outlined" 
              href={book.externalLinkUrl} 
              target="_blank"
              sx={{ 
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(92, 45, 145, 0.04)'
                }
              }}
            >
              상세 정보 확인 (외부 링크)
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookInfo;