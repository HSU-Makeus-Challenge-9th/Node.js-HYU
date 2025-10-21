import { responseFromReview } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
} from "../repositories/review.repository.js";


export const userReview = async(data) => {
  const result = await addReview(data);
  if (result === null){
    throw new Error("작성된 리뷰입니다.");
  }

  const review = await getReview(result);
  return responseFromReview(review);
}

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
}