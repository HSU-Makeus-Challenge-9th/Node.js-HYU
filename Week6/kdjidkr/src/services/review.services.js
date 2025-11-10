import { addReview } from "../repositories/review.repositories.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const reviewAdd = async (data) => {
    const result = await addReview(data);
    if (result === null) {
        throw new Error("리뷰 추가에 실패했습니다.");
    }
    return responseFromReview(result);
};