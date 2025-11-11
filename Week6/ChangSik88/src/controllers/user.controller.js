import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { validateUserSignup } from "../validators/user.validator.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  const data = bodyToUser(req.body);
  validateUserSignup(data)

  const user = await userSignUp(data);
  res.status(StatusCodes.OK).json({ 
    message : "회원가입에 성공했습니다",
    result: user });
};

