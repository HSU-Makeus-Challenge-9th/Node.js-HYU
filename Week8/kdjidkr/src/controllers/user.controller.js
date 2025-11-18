import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/user.service.js";
import { listUserMissionsInProgress } from "../services/user.service.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { MissingRequiredFieldError } from "../errors.js";

// 사용자 회원가입 처리 핸들러
export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.CREATED).success(user);
}

// 특정 사용자의 리뷰 목록 조회 핸들러
export const handleListUserReviews = asyncHandler(async (req, res, next) => {
    if (!req.params.userId || isNaN(parseInt(req.params.userId))) {
      throw new MissingRequiredFieldError();
    }
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0,
    );
    res.status(StatusCodes.OK).success(reviews);
  });

// 특정 사용자의 진행 중인 미션 목록 조회 핸들러
export const handleListUserMissionsInProgress = asyncHandler(async (req, res, next) => {
    const missions = await listUserMissionsInProgress(
      parseInt(req.params.userId),
      typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0,
    );
    res.status(StatusCodes.OK).success(missions);
  });