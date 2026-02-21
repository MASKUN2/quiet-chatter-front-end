import React from 'react';
import { Container, Box, Alert, Skeleton, Stack, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/common/Header';
import BookListItem from '../components/book/BookListItem';
import { useBookSearch } from '../hooks/useBookSearch';

const BookSearch: React.FC = () => {
  const { keyword, books, loading, error, lastBookElementRef } = useBookSearch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" disableGutters={isMobile} sx={{ pb: { xs: 2, md: 4 } }}>
      <Stack spacing={{ xs: 2, md: 4 }}>
        <Header />

        <Box sx={{ minHeight: 500 }}>
          {books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <div key={book.id} ref={lastBookElementRef}>
                  <BookListItem book={book} />
                </div>
              );
            } else {
              return <BookListItem key={book.id} book={book} />;
            }
          })}

          {loading && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              {Array.from(new Array(3)).map((_, i) => (
                <Box key={i} sx={{ display: 'flex', height: 122, alignItems: 'center', p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Skeleton variant="rectangular" width={60} height={90} sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton width="60%" height={32} />
                    <Skeleton width="40%" />
                    <Skeleton width="30%" />
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {!loading && !error && books.length === 0 && keyword && (
            <Alert severity="info" sx={{ mt: 2 }}>검색 결과가 없습니다.</Alert>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default BookSearch;