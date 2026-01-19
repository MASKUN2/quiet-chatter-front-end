import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { Talk } from '../../types';

interface TalkItemProps {
  talk: Talk;
  onReaction: (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => void;
}

const TalkItem: React.FC<TalkItemProps> = ({ talk, onReaction }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" paragraph>{talk.content}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="caption">
              {new Date(talk.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              color={talk.didILike ? "primary" : "inherit"}
              startIcon={talk.didILike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              onClick={() => onReaction(talk.id, 'LIKE', talk.didILike)}
            >
              {talk.like_count}
            </Button>
            <Button 
              size="small"
              color={talk.didISupport ? "error" : "inherit"}
              startIcon={talk.didISupport ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => onReaction(talk.id, 'SUPPORT', talk.didISupport)}
            >
              {talk.support_count}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TalkItem;
