import { StatusCodes } from "http-status-codes";
import { bodyToReviewJson } from "../dtos/review-json.dto.js";
import { reviewAddJson } from "../services/review-json.service.js";
import { ValidationError } from "../errors/custom-error.js";

export const handleReviewAddJson = async (req, res, next) => {
  try {
    console.log("리뷰 추가를 요청했습니다! (JSON)");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.rating || !req.body.content || !req.body.challengeMissionId || !req.body.userId) {
      throw new ValidationError("별점, 리뷰 내용, challengeMissionId, userId는 필수 항목입니다.");
    }

    const review = await reviewAddJson(bodyToReviewJson(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "리뷰가 성공적으로 등록되었습니다.",
      data: review
    });
  } catch (err) {
    next(err);
  }
};
