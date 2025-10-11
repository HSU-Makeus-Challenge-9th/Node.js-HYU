import { StatusCodes } from "http-status-codes";
import { bodyToMissionSuccess } from "../dtos/mission-success.dto.js";
import { missionSuccessRequest, missionSuccessConfirm } from "../services/mission-success.service.js";

export const handleMissionSuccessRequest = async (req, res, next) => {
  try {
    console.log("미션 성공 요청을 받았습니다!");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.challengeMissionId || !req.body.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "challengeMissionId와 userId는 필수입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    const result = await missionSuccessRequest(bodyToMissionSuccess(req.body));
    
    res.status(StatusCodes.OK).json({
      statusCode: 200,
      message: "미션 성공 요청이 완료되었습니다.",
      data: result
    });
  } catch (err) {
    if (err.message.includes("자신의 미션만 완료할 수 있습니다")) {
      return res.status(StatusCodes.FORBIDDEN).json({
        statusCode: 403,
        message: "자신의 미션만 완료할 수 있습니다.",
        error: "FORBIDDEN",
        data: null
      });
    }
    if (err.message.includes("진행 중인 미션만 완료할 수 있습니다")) {
      return res.status(StatusCodes.CONFLICT).json({
        statusCode: 409,
        message: "진행 중인 미션만 완료할 수 있습니다.",
        error: "INVALID_MISSION_STATUS",
        data: null
      });
    }
    next(err);
  }
};

export const handleMissionSuccessConfirm = async (req, res, next) => {
  try {
    console.log("미션 성공 확정을 요청했습니다!");
    console.log("body:", req.body);

    // 필수 필드 검증
    if (!req.body.verificationCode || !req.body.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "verificationCode와 userId는 필수입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    const result = await missionSuccessConfirm({
      verificationCode: req.body.verificationCode,
      userId: parseInt(req.body.userId)
    });
    
    res.status(StatusCodes.OK).json({
      statusCode: 200,
      message: "미션 성공이 확정되었습니다.",
      data: result
    });
  } catch (err) {
    if (err.message.includes("유효하지 않은 인증 코드")) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "유효하지 않은 인증 코드입니다.",
        error: "INVALID_VERIFICATION_CODE",
        data: null
      });
    }
    next(err);
  }
};
