import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { formDataToReview } from "../dtos/review.dto.js";
import { reviewAdd, getMyReviewList } from "../services/review.service.js";
import { ValidationError } from "../errors/custom-error.js";

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB 제한
  }
});

export const handleReviewAdd = async (req, res, next) => {
  try {
    console.log("리뷰 추가를 요청했습니다!");
    console.log("body:", req.body);
    console.log("files:", req.files);

    // 필수 필드 검증
    if (!req.body.rating || !req.body.content) {
      throw new ValidationError("별점과 리뷰 내용은 필수 항목입니다.");
    }

    const review = await reviewAdd(formDataToReview(req.body, req.files));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "리뷰가 성공적으로 등록되었습니다.",
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// multer 미들웨어를 export
export const uploadMiddleware = upload.array('images', 5); // 최대 5개 파일

export const handleGetMyReviews = async (req, res, next) => {
  try {
    const userId = req.params.userId; // 실제로는 인증된 사용자 ID를 사용해야 함
    const cursor = req.query.cursor;

    const result = await getMyReviewList(userId, cursor);

    res.status(StatusCodes.OK).json({
      statusCode: 200,
      message: "내 리뷰 목록 조회에 성공했습니다.",
      data: {
        reviews: result.reviews,
        pagination: result.pagination
      }
    });
  } catch (err) {
    next(err);
  }
};
