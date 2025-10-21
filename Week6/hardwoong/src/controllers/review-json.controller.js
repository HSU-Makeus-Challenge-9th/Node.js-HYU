import { StatusCodes } from "http-status-codes";
import { bodyToReviewJson } from "../dtos/review-json.dto.js";
import { reviewAddJson } from "../services/review-json.service.js";

export const handleReviewAddJson = async (req, res, next) => {
  try {
    console.log("리뷰 추가를 요청했습니다! (JSON)");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.rating || !req.body.content || !req.body.challengeMissionId || !req.body.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "별점, 리뷰 내용, challengeMissionId, userId는 필수 항목입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    const review = await reviewAddJson(bodyToReviewJson(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "리뷰가 성공적으로 등록되었습니다.",
      data: review
    });
  } catch (err) {
    if (err.message.includes("이미 리뷰를 작성한 미션입니다")) {
      return res.status(StatusCodes.CONFLICT).json({
        statusCode: 409,
        message: "이미 리뷰를 작성한 미션입니다.",
        error: "REVIEW_ALREADY_EXISTS",
        data: null
      });
    }
    if (err.message.includes("완료된 미션을 찾을 수 없습니다")) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "완료된 미션을 찾을 수 없습니다.",
        error: "MISSION_NOT_COMPLETED",
        data: null
      });
    }
    if (err.message.includes("자신의 미션에만 리뷰를 작성할 수 있습니다")) {
      return res.status(StatusCodes.FORBIDDEN).json({
        statusCode: 403,
        message: "자신의 미션에만 리뷰를 작성할 수 있습니다.",
        error: "FORBIDDEN",
        data: null
      });
    }
    next(err);
  }
};
