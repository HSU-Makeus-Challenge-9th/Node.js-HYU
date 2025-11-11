import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews,
  getAllUserReviews,
} from "../repositories/review.repository.js";
import { AlreadyReviewExist, } from "../middlewares/errors.js";


export const userReview = async(data) => {
  const result = await addReview(data);
  if(!result){
    throw new AlreadyReviewExist("이미 작성된 리뷰입니다.", data);
  };

  const review = await getReview(result);
  return responseFromReview(review);
}

export const listStoreReviews = async (storeId,cursor) => {
  const reviews = await getAllStoreReviews(storeId,cursor);
  return responseFromReviews(reviews);
}

export const listUserReviews = async (userId,cursor) => {
  const users = await getAllUserReviews(userId,cursor);
  return responseFromReviews(users);
}