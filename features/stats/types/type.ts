export interface ReadingStats {
    totalBooks: number
    totalPages: number
    averageRating: number | null
    genreDistribution: { [key: string]: number }
    monthlyReadCount: { [key: string]: number }
    bookPages: Array<{ title: string, pages: number }>;
  }