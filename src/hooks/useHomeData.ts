import { useState, useEffect } from 'react';
import { getRecommendedTalks, getBooksByIds } from '../api/api';
import type { Talk, Book } from '../types';
import { MESSAGES } from '../constants';

export const useHomeData = () => {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [books, setBooks] = useState<Map<string, Book>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const recommendedTalks = await getRecommendedTalks();

        if (!isMounted) return;

        if (!Array.isArray(recommendedTalks)) {
          setTalks([]);
          return;
        }

        setTalks(recommendedTalks);

        if (recommendedTalks.length > 0) {
          const bookIds = Array.from(new Set(recommendedTalks.map(t => t.bookId)));
          const booksData = await getBooksByIds(bookIds);
          if (isMounted) {
            setBooks(new Map(booksData.map(b => [b.id, b])));
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : MESSAGES.ERROR.DEFAULT);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { talks, books, loading, error };
};
