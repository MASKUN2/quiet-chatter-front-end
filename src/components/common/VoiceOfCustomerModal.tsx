import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { sendVocMessage } from '../../api/api';

const VoiceOfCustomerModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await sendVocMessage(message);
      alert('소중한 의견 감사합니다!');
      setMessage('');
      handleClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleOpen}
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
        >
          무엇이든 말씀해주세요
        </Button>
         <IconButton 
          color="secondary" 
          onClick={handleOpen}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Voice of Customer</DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="message"
                label="메시지를 남겨주세요"
                type="text"
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                placeholder="서비스에 대한 소중한 의견을 남겨주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                취소
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? '전송 중...' : '전송'}
              </Button>
            </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default VoiceOfCustomerModal;
