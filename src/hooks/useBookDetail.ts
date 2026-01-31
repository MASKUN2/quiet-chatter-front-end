import { useState, useEffect, useCallback } from 'react';
import { getBookDetails, getTalks, postTalk, handleReaction } from '../api/api';
import type { Book, Talk, PageInfo } from '../types';
import { useAuth } from '../context/AuthContext';

export const useBookDetail = (bookId: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const { user, refreshUser } = useAuth();
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
      
      // Refresh user auth before loading talks (to capture guest session etc.)
      if (page === 0) {
        await refreshUser();
      }

      const data = await getTalks(id, page);
      setTalks(data.content);
      setPageInfo(data.page);
      setTalkPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTalks(false);
    }
  }, [refreshUser]);

  const onTalkUpdate = () => {
    if(bookId) {
      loadTalks(bookId, talkPage);
    }
  }

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while posting the talk.');
      }
    }
  };

  const onReaction = async (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => {
    try {
      await handleReaction(talkId, type, hasReacted);
      
      setTalks(prev => prev.map(t => {
        if (String(t.id) !== String(talkId)) return t;
        const isLike = type === 'LIKE';
        
        if (isLike) {
            return {
                ...t,
                didILike: !hasReacted,
                like_count: hasReacted ? (t.like_count ?? 0) - 1 : (t.like_count ?? 0) + 1
            };
        } 
        
        return {
            ...t,
            didISupport: !hasReacted,
            support_count: hasReacted ? (t.support_count ?? 0) - 1 : (t.support_count ?? 0) + 1
        };
      }));

    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred while processing the reaction.');
      }
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
  };
};
