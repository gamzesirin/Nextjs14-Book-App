import { useEffect, useState, useCallback } from 'react';
import { Review } from '../types/type';
import { getReviews } from '../services/Review';

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('İncelemeler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const mutate = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, mutate };
};