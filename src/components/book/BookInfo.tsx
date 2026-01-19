import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import type { Book } from '../../types';

interface BookInfoProps {
  book: Book;
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 4 }}>
        {book.thumbnailImageUrl ? (
          <img 
            src={book.thumbnailImageUrl} 
            alt={book.title} 
            style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
        ) : (
          <Box sx={{ width: '100%', height: 300, bgcolor: 'grey.200', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">No Image</Typography>
          </Box>
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>{book.title}</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {book.description}
          </Typography>
        </Box>
        {book.externalLinkUrl && (
          <Button variant="outlined" href={book.externalLinkUrl} target="_blank">
            더 보기
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default BookInfo;