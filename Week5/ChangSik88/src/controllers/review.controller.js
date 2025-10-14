import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { userReview } from "../services/review.service.js";

export const createReview = async (req,res,next) => {       //req는 요청 데이터, res는 응답 보내는 객체
  console.log("리뷰 작성을 요청하였습니다!");
  console.log("body:", req.body);

  const review = await userReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ 
    statusCode: 200,
    message: "리뷰가 성공적으로 등록되었습니다.",
    result: review });

}