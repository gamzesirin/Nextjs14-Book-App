import { ReadingStats } from "../types/type";

async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const fetchReadingStats = async (): Promise<ReadingStats> => {
  try {
    return await fetchWithErrorHandling('/api/stats');
  } catch (error) {
    console.error('İstatistikleri çekerken hata oluştu:', error);
    throw error;
  }
};

// Gelecekte eklenebilecek diğer istatistik sorguları için:

export const fetchGenreDistribution = async (): Promise<{ [key: string]: number }> => {
  try {
    const stats = await fetchWithErrorHandling('/api/stats');
    return stats.genreDistribution;
  } catch (error) {
    console.error('Tür dağılımını çekerken hata oluştu:', error);
    throw error;
  }
};

export const fetchMonthlyReadCount = async (): Promise<{ [key: string]: number }> => {
  try {
    const stats = await fetchWithErrorHandling('/api/stats');
    return stats.monthlyReadCount;
  } catch (error) {
    console.error('Aylık okuma sayısını çekerken hata oluştu:', error);
    throw error;
  }
};