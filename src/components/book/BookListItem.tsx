import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, CardMedia, CardContent, Typography, Link as MuiLink } from '@mui/material';
import type { Book } from '../../types';

interface BookListItemProps {
  book: Book;
}

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
        <Box sx={{ p: 2 }}>
            {book.thumbnailImageUrl ? (
                <MuiLink component={Link} to={`/books/${book.id}`}>
                    <CardMedia
                        component="img"
                        sx={{ width: 60, height: 90, objectFit: 'contain' }}
                        image={book.thumbnailImageUrl}
                        alt={book.title}
                    />
                </MuiLink>
            ) : (
                <Box sx={{ width: 60, height: 90, bgcolor: 'grey.300' }} />
            )}
        </Box>
        <CardContent sx={{ flex: '1 0 auto', overflow: 'hidden' }}>
            <Typography component="h5" variant="h6" noWrap>
                <MuiLink component={Link} to={`/books/${book.id}`} color="inherit" underline="hover">
                    {book.title}
                </MuiLink>
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
                저자: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
                ISBN: {book.isbn}
            </Typography>
        </CardContent>
    </Card>
  );
};

export default BookListItem;
