import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { formDataToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";

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
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "별점과 리뷰 내용은 필수 항목입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    const review = await reviewAdd(formDataToReview(req.body, req.files));
    
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
    next(err);
  }
};

// multer 미들웨어를 export
export const uploadMiddleware = upload.array('images', 5); // 최대 5개 파일
