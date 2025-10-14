import { responseFromReview } from "../dtos/review.dto.js";
import { addReview } from "../repositories/review.repository.js";

export const reviewAdd = async (data) => {
  const result = await addReview(data);
  return responseFromReview(result, result.storeName);
};
