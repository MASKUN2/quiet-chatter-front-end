import React from 'react';
import { Container, Box, Alert, Skeleton, Stack, Button } from '@mui/material';
import Header from '../components/common/Header';
import BookListItem from '../components/book/BookListItem';
import { useBookSearch } from '../hooks/useBookSearch';

const BookSearch: React.FC = () => {
  const { keyword, books, sliceInfo, loading, error, loadMore } = useBookSearch();

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Header />
      
      <Box sx={{ mt: 4, minHeight: 500 }}>
        {books.map(book => (
             <BookListItem key={book.id} book={book} />
        ))}

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

        {!loading && sliceInfo && !sliceInfo.last && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant="outlined" onClick={loadMore} fullWidth sx={{ py: 1.5 }}>
                    더 보기
                </Button>
            </Box>
        )}
      </Box>
    </Container>
  );
};

export default BookSearch;