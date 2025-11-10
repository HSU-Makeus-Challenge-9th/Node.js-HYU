import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/user.service.js";
import { listUserMissionsInProgress } from "../services/user.service.js";


// 사용자 회원가입 처리 핸들러
export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
}

// 특정 사용자의 리뷰 목록 조회 핸들러
export const handleListUserReviews = async (req, res, next) => {
  try {
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0,
    );
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message: error.message});
  }
}

// 특정 사용자의 진행 중인 미션 목록 조회 핸들러
export const handleListUserMissionsInProgress = async (req, res, next) => {
  try {
    const missions = await listUserMissionsInProgress(
      parseInt(req.params.userId),
      typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0,
    );
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message: error.message});
  }
}