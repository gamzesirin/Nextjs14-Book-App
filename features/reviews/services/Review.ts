import { CreateReviewData, Review } from "../types/type";
import { fetchReviews, postReview } from "../queries/useReview";

export const getReviews = async (): Promise<Review[]> => {
  const reviews = await fetchReviews();
  return reviews.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createReview = async (reviewData: CreateReviewData) => {
  // Burada veri doğrulama veya işleme yapabilirsiniz
  const newReview = await postReview(reviewData);
  return newReview;
};