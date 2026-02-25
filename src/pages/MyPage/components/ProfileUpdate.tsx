import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { updateProfile } from '../../../api/api';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate: React.FC = () => {
    const { member, refreshMember } = useAuth();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState(member?.nickname || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nickname.trim() || nickname === member?.nickname) return;

        setLoading(true);
        setMessage(null);
        try {
            await updateProfile(nickname);
            await refreshMember();
            setMessage({ text: '프로필이 성공적으로 업데이트되었습니다.', type: 'success' });
        } catch (error: any) {
            setMessage({ text: error.message || '프로필 업데이트에 실패했습니다.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleUpdate} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>프로필 수정</Typography>
            {message && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                    label="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={loading}
                    fullWidth
                />
                <Button
                    variant="outlined"
                    onClick={() => navigate('/mypage')}
                    disabled={loading}
                    sx={{ height: 56, minWidth: 80 }}
                >
                    취소
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !nickname.trim() || nickname === member?.nickname}
                    sx={{ height: 56, minWidth: 100 }}
                >
                    {loading ? '저장 중...' : '저장'}
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileUpdate;
