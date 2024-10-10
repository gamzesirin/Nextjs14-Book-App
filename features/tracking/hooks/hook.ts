import { useEffect, useState } from 'react';

import { Book } from '../types/type';
import { fetchBooks } from '../queries/useTracking';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Kitaplar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const refreshBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Kitaplar yeniden yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, refreshBooks };
};