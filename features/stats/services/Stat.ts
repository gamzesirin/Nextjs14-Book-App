import { ReadingStats } from "../types/type";

;

export const getReadingStats = async (): Promise<ReadingStats> => {
  const response = await fetch('/api/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};