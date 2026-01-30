import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, Stack, Box, Skeleton, Alert } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { Talk, Book } from '../../types';

interface RecommendedTalksProps {
  loading: boolean;
  error: string | null;
  talks: Talk[];
  books: Map<string, Book>;
}

const RecommendedTalks: React.FC<RecommendedTalksProps> = ({ loading, error, talks, books }) => {
  if (loading) {
     return (
       <List>
          {Array.from(new Array(3)).map((_, index) => (
              <ListItem key={index} disablePadding>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', py: 1 }}>
                      <Skeleton variant="rectangular" width={50} height={75} sx={{ mr: 2, borderRadius: 1 }} />
                      <Box sx={{ flexGrow: 1 }}>
                          <Skeleton width="60%" />
                          <Skeleton width="40%" />
                      </Box>
                  </Box>
              </ListItem>
          ))}
       </List>
     );
  }
  
  if (error) return <Alert severity="error">{error}</Alert>;
  if (talks.length === 0) return <Typography color="textSecondary">최근 등록된 북톡이 없습니다.</Typography>;

  return (
    <List>
      {talks.map(talk => {
        const book = books.get(talk.bookId);
        if (!book) return null;
        const truncatedContent = talk.content.length > 100 ? talk.content.substring(0, 100) + '...' : talk.content;

        return (
          <ListItem key={talk.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={Link} to={`/books/${book.id}`} sx={{ borderRadius: 1, border: '1px solid #e0e0e0', p: 1.5 }}>
              <ListItemAvatar sx={{ mr: 1.5 }}>
                <Avatar
                  variant="rounded"
                  src={book.thumbnailImageUrl || '/images/quiet-chatter-icon.png'}
                  alt={book.title}
                  sx={{ width: 45, height: 68 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" noWrap>
                      {book.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" noWrap component="span" display="block">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap component="span" display="block" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                      "{truncatedContent}"
                    </Typography>
                  </>
                }
              />
              <Stack direction="row" spacing={1.5} sx={{ ml: 2, alignItems: 'center' }}>
                  <Typography variant="caption" display="flex" alignItems="center" color={talk.didILike ? "primary.main" : "text.secondary"}>
                    {talk.didILike ? <ThumbUpAltIcon fontSize="small" sx={{ mr: 0.5 }} /> : <ThumbUpOffAltIcon fontSize="small" sx={{ mr: 0.5 }} />}
                    {talk.like_count}
                  </Typography>
                  <Typography variant="caption" display="flex" alignItems="center" color={talk.didISupport ? "error.main" : "text.secondary"}>
                    {talk.didISupport ? <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} /> : <FavoriteBorderIcon fontSize="small" sx={{ mr: 0.5 }} />}
                    {talk.support_count}
                  </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default RecommendedTalks;
