import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Box, Typography, Pagination, Skeleton, Alert, Paper, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/common/Header';
import BookInfo from '../components/book/BookInfo';
import TalkForm from '../components/book/TalkForm';
import TalkList from '../components/book/TalkList';
import { useBookDetail } from '../hooks/useBookDetail';

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Container maxWidth="md" disableGutters={isMobile} sx={{ mt: 0, pb: 6 }}>
          <Header />
          <Box sx={{ mt: isMobile ? 2 : 4, px: isMobile ? 2 : 0 }}>
            <Skeleton variant="rectangular" height={300} />
            <Skeleton height={40} sx={{ mt: 2 }} />
            <Skeleton height={20} width="60%" />
          </Box>
        </Container>
      );
  }

  if (!book) {
    return (
      <Container maxWidth="md" disableGutters={isMobile} sx={{ mt: 0, pb: 6 }}>
        <Header />
        <Box sx={{ mt: isMobile ? 2 : 4, px: isMobile ? 2 : 0 }}>
          <Alert severity="error">책 정보를 찾을 수 없습니다.</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" disableGutters={isMobile} sx={{ mt: 0, pb: 6 }}>
      <Header />
      <Box sx={{ mt: isMobile ? 2 : 4 }}>
        <BookInfo book={book} />
        
        <Divider sx={{ my: isMobile ? 4 : 6 }} />

        <Box sx={{ px: isMobile ? 0 : 0 }}>
          <Paper elevation={isMobile ? 0 : 1} sx={{ p: isMobile ? 1 : 2, borderRadius: isMobile ? 0 : 2, backgroundColor: 'background.paper' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              Talks
            </Typography>

            {user?.isLoggedIn ? (
              <TalkForm 
                content={talkContent} 
                setContent={setTalkContent} 
                onSubmit={onPostTalk} 
                nickname={user?.nickname}
              />
            ) : (
              <Box sx={{ 
                mb: 4, 
                p: 3, 
                textAlign: 'center', 
                bgcolor: 'grey.50', 
                borderRadius: 2, 
                border: '1px dashed', 
                borderColor: 'grey.400' 
              }}>
                <Typography variant="body1" color="text.secondary">
                  톡을 남기려면 로그인이 필요합니다.
                </Typography>
              </Box>
            )}

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
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default BookDetail;
