// export interface Review {
//   id: string;
//   content: string;
//   rating: number;  // 5 üzerinden puanlama için
//   userId: string;
//   bookId: string;
//   createdAt: Date;
// }

// export type CreateReviewData = Omit<Review, 'id' | 'createdAt'>;

export interface Review {
  id: string;
  title: string;
  content: string;
  rating?: number;
  createdAt: string;
}