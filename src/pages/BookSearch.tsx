import React from 'react';
import { Container, Pagination, Box, Alert, Skeleton, Stack } from '@mui/material';
import Header from '../components/common/Header';
import BookListItem from '../components/book/BookListItem';
import { useBookSearch } from '../hooks/useBookSearch';

const BookSearch: React.FC = () => {
  const { keyword, books, pageInfo, loading, error, handlePageChange } = useBookSearch();

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Header />
      
      <Box sx={{ mt: 4, minHeight: 500 }}>
        {loading && (
             <Stack spacing={2}>
                 {Array.from(new Array(5)).map((_, i) => (
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

        {error && <Alert severity="error">{error}</Alert>}
        
        {!loading && !error && books.length === 0 && keyword && (
            <Alert severity="info">검색 결과가 없습니다.</Alert>
        )}

        {!loading && books.map(book => (
             <BookListItem key={book.id} book={book} />
        ))}
      </Box>
      
      {pageInfo && pageInfo.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
                count={pageInfo.totalPages} 
                page={pageInfo.number + 1} 
                onChange={handlePageChange} 
                color="primary" 
            />
        </Box>
      )}
    </Container>
  );
};

export default BookSearch;