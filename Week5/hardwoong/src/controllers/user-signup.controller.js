import { StatusCodes } from "http-status-codes";
import { bodyToUserSignup } from "../dtos/user-signup.dto.js";
import { userSignup } from "../services/user-signup.service.js";

export const handleUserSignup = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.name || !req.body.gender || !req.body.email || !req.body.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "이름, 성별, 이메일, 비밀번호는 필수 항목입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "올바른 이메일 형식이 아닙니다.",
        error: "INVALID_EMAIL_FORMAT",
        data: null
      });
    }

    // 비밀번호 길이 검증
    if (req.body.password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "비밀번호는 8자 이상이어야 합니다.",
        error: "PASSWORD_TOO_SHORT",
        data: null
      });
    }

    const user = await userSignup(bodyToUserSignup(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "회원가입이 성공적으로 완료되었습니다.",
      data: user
    });
  } catch (err) {
    if (err.message.includes("이미 존재하는 이메일입니다")) {
      return res.status(StatusCodes.CONFLICT).json({
        statusCode: 409,
        message: "이미 존재하는 이메일입니다.",
        error: "EMAIL_ALREADY_EXISTS",
        data: null
      });
    }
    next(err);
  }
};
