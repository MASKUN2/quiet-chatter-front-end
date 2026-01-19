import { useState, useEffect, useCallback } from 'react';
import { getBookDetails, getTalks, postTalk, handleReaction } from '../api/api';
import type { Book, Talk, PageInfo } from '../types';

export const useBookDetail = (bookId: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loadingBook, setLoadingBook] = useState(true);
  const [loadingTalks, setLoadingTalks] = useState(true);
  
  // Talk Form State
  const [talkContent, setTalkContent] = useState('');
  
  // Current Talk Page
  const [talkPage, setTalkPage] = useState(0);

  const loadBook = useCallback(async (id: string) => {
    try {
      setLoadingBook(true);
      const data = await getBookDetails(id);
      setBook(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBook(false);
    }
  }, []);

  const loadTalks = useCallback(async (id: string, page: number) => {
    try {
      setLoadingTalks(true);
      const data = await getTalks(id, page);
      setTalks(data.content);
      setPageInfo(data.page);
      setTalkPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTalks(false);
    }
  }, []);

  useEffect(() => {
    if (bookId) {
      loadBook(bookId);
      loadTalks(bookId, 0);
    }
  }, [bookId, loadBook, loadTalks]);

  const onPostTalk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !talkContent.trim()) return;

    try {
      await postTalk(bookId, talkContent);
      setTalkContent('');
      await loadTalks(bookId, 0); 
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onReaction = async (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => {
    try {
      const response = await handleReaction(talkId, type, hasReacted);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            alert('로그인이 필요합니다.');
        } else {
            alert('리액션 처리에 실패했습니다.');
        }
        return;
      }
      
      setTalks(prev => prev.map(t => {
        if (String(t.id) !== String(talkId)) return t;
        const isLike = type === 'LIKE';
        
        if (isLike) {
            return {
                ...t,
                didILike: !hasReacted,
                like_count: hasReacted ? t.like_count - 1 : t.like_count + 1
            };
        } 
        
        return {
            ...t,
            didISupport: !hasReacted,
            support_count: hasReacted ? t.support_count - 1 : t.support_count + 1
        };
      }));

    } catch (error: any) {
      alert(error.message);
      if (bookId) loadTalks(bookId, talkPage);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (bookId) loadTalks(bookId, value - 1);
  };

  return {
    book,
    talks,
    pageInfo,
    loadingBook,
    loadingTalks,
    talkContent,
    setTalkContent,
    talkPage,
    onPostTalk,
    onReaction,
    handlePageChange
  };
};
