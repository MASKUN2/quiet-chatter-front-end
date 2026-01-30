import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Box, Typography, Pagination, Skeleton, Alert } from '@mui/material';
import Header from '../components/common/Header';
import BookInfo from '../components/book/BookInfo';
import TalkForm from '../components/book/TalkForm';
import TalkList from '../components/book/TalkList';
import { useBookDetail } from '../hooks/useBookDetail';

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { 
    book, 
    talks, 
    pageInfo, 
    user,
    loadingBook, 
    loadingTalks, 
    talkContent, 
    setTalkContent, 
    talkPage, 
    onPostTalk, 
    onReaction, 
    onTalkUpdate,
    handlePageChange 
  } = useBookDetail(bookId);

  if (loadingBook) {
      return (
        <>
          <Header />
          <Container maxWidth="md" sx={{ mt: 5 }}>
            <Skeleton variant="rectangular" height={300} />
            <Skeleton height={40} sx={{ mt: 2 }} />
            <Skeleton height={20} width="60%" />
          </Container>
        </>
      );
  }

  if (!book) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Alert severity="error">책 정보를 찾을 수 없습니다.</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5, pb: 10 }}>
        <BookInfo book={book} />
        
        <Divider sx={{ my: 6 }} />

        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Talks
          </Typography>
          
          <TalkForm 
            content={talkContent} 
            setContent={setTalkContent} 
            onSubmit={onPostTalk} 
          />

          <TalkList 
            talks={talks} 
            loading={loadingTalks} 
            onReaction={onReaction} 
            currentUserId={user?.id}
            onUpdate={onTalkUpdate}
          />

          {pageInfo && pageInfo.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pageInfo.totalPages}
                page={talkPage + 1}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default BookDetail;