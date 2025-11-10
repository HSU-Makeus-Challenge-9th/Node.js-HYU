import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.services.js";

export const handleReviewAdd = async (req, res, next) => {
    console.log("리뷰 등록을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const review = await reviewAdd(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ 
        success: true,
        message: "리뷰가 성공적으로 등록되었습니다.",
        result: review });
};

export const handleMissionChallenge = async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");


    const challengedMission = await missionChallenge(bodyToMissionChallenge(req.body));
    res.status(StatusCodes.OK).json({ result: challengedMission });
};