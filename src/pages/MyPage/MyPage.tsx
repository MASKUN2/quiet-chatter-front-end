import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Stack, Divider } from '@mui/material';
import PagePaper from '../../components/common/PagePaper';
import { getMyTalks, handleReaction, getBooksByIds } from '../../api/api';
import type { Talk } from '../../types';
import TalkItem from '../../components/book/TalkItem';
import WithdrawalDialog from './components/WithdrawalDialog';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage: React.FC = () => {
    const { member } = useAuth();
    const navigate = useNavigate();

    const [talks, setTalks] = useState<Talk[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

    useEffect(() => {
        if (!member) {
            navigate('/home', { replace: true });
        }
    }, [member, navigate]);

    const fetchTalks = useCallback(async (pageNum: number, isInitial = false) => {
        try {
            if (isInitial) setLoading(true);
            const data = await getMyTalks(pageNum);

            const bookIds = Array.from(new Set(data.content.map(t => t.bookId)));
            const booksData = await getBooksByIds(bookIds);
            const booksMap = new Map(booksData.map(b => [b.id, b]));

            const enrichedTalks = data.content.map(t => {
                const book = booksMap.get(t.bookId);
                return {
                    ...t,
                    book: book ? {
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        cover: book.thumbnailImageUrl || ''
                    } : undefined
                };
            });

            setTalks(prev => isInitial ? enrichedTalks : [...prev, ...enrichedTalks]);
            setHasMore(!data.page.last);
        } catch (error) {
            console.error('Failed to fetch my talks:', error);
        } finally {
            if (isInitial) setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (member) {
            fetchTalks(0, true);
        }
    }, [member, fetchTalks]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTalks(nextPage);
    };

    const handleTalkReaction = async (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => {
        if (!member) return;
        try {
            await handleReaction(talkId, type, hasReacted);
            setTalks(prev => prev.map(talk => {
                if (talk.id !== talkId) return talk;

                let likeCount = talk.like_count ?? 0;
                let supportCount = talk.support_count ?? 0;
                let didILike = talk.didILike;
                let didISupport = talk.didISupport;

                if (type === 'LIKE') {
                    didILike = !hasReacted;
                    likeCount += didILike ? 1 : -1;
                } else {
                    didISupport = !hasReacted;
                    supportCount += didISupport ? 1 : -1;
                }

                return {
                    ...talk,
                    like_count: likeCount,
                    support_count: supportCount,
                    didILike,
                    didISupport
                };
            }));
        } catch (error) {
            console.error('Failed to handle reaction:', error);
            alert('반응 처리에 실패했습니다.');
        }
    };

    if (!member) return null;

    return (
        <PagePaper>
            <Box sx={{ mb: 4 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', lineHeight: 1.4 }}>
                    MY PROFILE
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                            {member.nickname}
                        </Typography>
                        <Typography variant="caption" sx={{
                            bgcolor: 'grey.100',
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            {member.role}
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate('/mypage/profile')}
                        sx={{
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'rgba(92, 45, 145, 0.04)'
                            }
                        }}
                    >
                        프로필 수정
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'divider' }} />

            <Box sx={{ mb: 2 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.75rem', display: 'block', lineHeight: 1.4 }}>
                    MY TALKS
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
                    내가 작성한 톡
                </Typography>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={3}>
                    {talks.length === 0 ? (
                        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                            작성한 톡이 없습니다.
                        </Typography>
                    ) : (
                        talks.map(talk => (
                            <Box key={talk.id} sx={{ mb: 2 }}>
                                <TalkItem
                                    talk={talk}
                                    showBookInfo={true}
                                    isMyPageMode={true}
                                    onReaction={handleTalkReaction}
                                    currentMemberId={member.id}
                                    onUpdate={() => fetchTalks(0, true)}
                                />
                            </Box>
                        ))
                    )}
                    {hasMore && talks.length > 0 && (
                        <Box sx={{ textAlign: 'center', pt: 2 }}>
                            <Button onClick={loadMore} variant="outlined" color="primary">
                                더보기
                            </Button>
                        </Box>
                    )}
                </Stack>
            )}

            <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                <Button
                    color="primary"
                    onClick={() => setIsWithdrawalOpen(true)}
                    sx={{ textDecoration: 'underline' }}
                >
                    회원 탈퇴
                </Button>
            </Box>

            <WithdrawalDialog
                open={isWithdrawalOpen}
                onClose={() => setIsWithdrawalOpen(false)}
            />
        </PagePaper>
    );
};

export default MyPage;
