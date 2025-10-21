import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToMissionSuccess } from "../dtos/mission.dto.js";
import { missionAdd, missionChallenge, missionSuccessRequest, missionSuccessConfirm, getMyOngoingMissionList, getStoreMissionList } from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  try {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);

    const mission = await missionAdd(bodyToMission(req.body));
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "미션이 성공적으로 추가되었습니다.",
      data: mission
    });
  } catch (err) {
    next(err);
  }
};

export const handleMissionChallenge = async (req, res, next) => {
  try {
    console.log("미션 도전을 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const { missionId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "사용자 ID는 필수입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    }

    const result = await missionChallenge({
      userId: parseInt(userId),
      missionId: parseInt(missionId)
    });
    
    res.status(StatusCodes.CREATED).json({
      statusCode: 201,
      message: "미션 도전이 성공적으로 시작되었습니다.",
      data: result
    });
  } catch (err) {
    if (err.message.includes("이미 도전 중인 미션입니다")) {
      return res.status(StatusCodes.CONFLICT).json({
        statusCode: 409,
        message: "이미 도전 중인 미션입니다.",
        error: "MISSION_ALREADY_CHALLENGED",
        data: null
      });
    }
    next(err);
  }
};

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

export const handleGetMyOngoingMissions = async (req, res) => {
  try {
    const userId = req.params.userId; // 실제로는 인증된 사용자 ID를 사용해야 함
    const cursor = req.query.cursor;

    const result = await getMyOngoingMissionList(userId, cursor);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.missions,
      pagination: result.pagination
    });
  } catch (err) {
    console.error("진행 중인 미션 목록 조회 실패:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
};

export const handleGetStoreMissions = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const cursor = req.query.cursor;

    const result = await getStoreMissionList(storeId, cursor);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.missions,
      pagination: result.pagination
    });
  } catch (err) {
    console.error("가게 미션 목록 조회 실패:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message
    });
  }
};