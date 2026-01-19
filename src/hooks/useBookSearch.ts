import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchBooks } from '../api/api';
import type { Book, PageInfo } from '../types';

export const useBookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  
  const [books, setBooks] = useState<Book[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (kw: string, pg: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchBooks(kw, pg - 1);
      setBooks(data.content);
      setPageInfo(data.page);
    } catch (err: any) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (keyword) {
      fetchBooks(keyword, pageParam);
    }
  }, [keyword, pageParam, fetchBooks]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ keyword, page: value.toString() });
  };

  return {
    keyword,
    books,
    pageInfo,
    loading,
    error,
    handlePageChange
  };
};
