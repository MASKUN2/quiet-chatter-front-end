import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { MESSAGES } from '../../constants';

interface SignupModalProps {
  open: boolean;
  tempNickname: string;
  onSignup: (nickname: string) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, tempNickname, onSignup, onCancel, loading }) => {
  const [nickname, setNickname] = useState(tempNickname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      alert(MESSAGES.ERROR.INPUT_REQUIRED);
      return;
    }
    await onSignup(nickname);
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onCancel} fullWidth maxWidth="xs">
      <DialogTitle>회원가입</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            아직 회원이 아니시군요! <br />
            사용하실 닉네임을 입력하고 가입을 완료해주세요.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="닉네임"
            type="text"
            fullWidth
            variant="outlined"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={loading}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="inherit" disabled={loading}>
            취소
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? '가입 중...' : '가입하기'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignupModal;
