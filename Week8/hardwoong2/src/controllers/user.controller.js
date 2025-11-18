import { StatusCodes } from "http-status-codes";
import { bodyToUserSignup } from "../dtos/user.dto.js";
import { userSignup } from "../services/user.service.js";
import { ValidationError, InvalidEmailFormatError, PasswordTooShortError } from "../errors/custom-error.js";

export const handleUserSignup = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.name || !req.body.gender || !req.body.email || !req.body.password) {
      throw new ValidationError("이름, 성별, 이메일, 비밀번호는 필수 항목입니다.");
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      throw new InvalidEmailFormatError();
    }

    // 비밀번호 길이 검증
    if (req.body.password.length < 8) {
      throw new PasswordTooShortError();
    }

    const user = await userSignup(bodyToUserSignup(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "회원가입이 성공적으로 완료되었습니다.",
      data: user
    });
  } catch (err) {
    next(err);
  }
};
