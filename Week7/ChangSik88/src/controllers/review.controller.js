import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { userReview } from "../services/review.service.js";
import {listStoreReviews, 
        listUserReviews} from "../services/review.service.js"
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createReview = asyncHandler(async (req,res,next) => {       //req는 요청 데이터, res는 응답 보내는 객체
  console.log("리뷰 작성을 요청하였습니다!");
  console.log("body:", req.body);

  const review = await userReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ 
    message: "리뷰가 성공적으로 등록되었습니다.",
    result: review });

});

export const handleListStoreReviews = asyncHandler(async (req, res, next) => {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0  
    );
    res.status(StatusCodes.OK).json({
      message : "성공적으로 불러왔습니다",
      result : reviews
    });
  });

  export const handleListUserReviews = asyncHandler(async (req,res,next) => {
    const users = await listUserReviews(
      parseInt(req.params.userId),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
      message : "성공적으로 불러왔습니다",
      result: users
    });
  });