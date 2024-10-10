export const RATING_MIN = 1;
export const RATING_MAX = 5;
export const CONTENT_MAX_LENGTH = 500;

export const API_ENDPOINTS = {
  REVIEWS: '/api/reviews',
  REVIEW_BY_ID: (id: string) => `/api/reviews/${id}`,
};