import { useState, useEffect } from 'react';
import { getRecommendedTalks, getBooksByIds } from '../api/api';
import type { Talk, Book } from '../types';

export const useHomeData = () => {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [books, setBooks] = useState<Map<string, Book>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recommendedTalks = await getRecommendedTalks();
        setTalks(recommendedTalks);

        if (recommendedTalks.length > 0) {
          const bookIds = Array.from(new Set(recommendedTalks.map(t => t.bookId)));
          const booksData = await getBooksByIds(bookIds);
          setBooks(new Map(booksData.map(b => [b.id, b])));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { talks, books, loading, error };
};
