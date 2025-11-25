import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.services.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { MissingRequiredFieldError } from "../errors.js";

export const handleReviewAdd = asyncHandler(async (req, res, next) => {
    console.log("리뷰 등록을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    if (!req.user.userId || !req.body.store_id || !req.body.score) {
        throw new MissingRequiredFieldError();
    }
    const userId = req.user.userId; // 액세스 토큰에서 사용자 ID 추출
    const review = await reviewAdd(bodyToReview(userId, req.body));
    res.status(StatusCodes.CREATED).success({
        message: "리뷰가 성공적으로 등록되었습니다.",
        result: review });
});

/*
export const handleMissionChallenge = asyncHandler(async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");
    const userId = req.user.userId; // 액세스 토큰에서 사용자 ID 추출
    const challengedMission = await missionChallenge(bodyToMissionChallenge(userId, req.body));
    res.status(StatusCodes.OK).success({ message: "미션 도전에 성공했습니다.", result: challengedMission });
});
*/