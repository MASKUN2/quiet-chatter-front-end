import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, IconButton, Stack } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateTalk, deleteTalk } from '../../api/api';
import type { Talk } from '../../types';

interface TalkItemProps {
  talk: Talk;
  onReaction: (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => void;
  currentUserId?: string | null;
  onUpdate: () => void;
}

const TalkItem: React.FC<TalkItemProps> = ({ talk, onReaction, currentUserId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(talk.content);
  const [loading, setLoading] = useState(false);

  const isMine = currentUserId && String(talk.memberId) === String(currentUserId);

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === talk.content) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await updateTalk(talk.id, editContent);
      setIsEditing(false);
      onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('수정에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    setLoading(true);
    try {
      await deleteTalk(talk.id);
      onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('삭제에 실패했습니다.');
      }
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ mx: 0 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 1.5 }}>
          <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
          <Typography variant="caption">
            {new Date(talk.createdAt).toLocaleDateString()}
            {talk.is_modified && ' (수정됨)'}
          </Typography>
          <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 500 }}>
            by {talk.nickname}
          </Typography>
        </Box>

        {isEditing ? (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              disabled={loading}
              sx={{ mb: 1 }}
              inputProps={{ style: { fontSize: '1rem' } }}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" onClick={() => setIsEditing(false)} disabled={loading}>취소</Button>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={handleUpdate} 
                disabled={loading}
                sx={{ 
                  color: '#5c2d91', 
                  borderColor: '#5c2d91',
                  '&:hover': {
                    borderColor: '#4b0082',
                    backgroundColor: 'rgba(92, 45, 145, 0.04)'
                  }
                }}
              >
                저장
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="body1" sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
              {talk.content}
            </Typography>
            {isMine && (
              <Box sx={{ ml: 1, mt: -0.5 }}>
                <IconButton size="small" onClick={() => setIsEditing(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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