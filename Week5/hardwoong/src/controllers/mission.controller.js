import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd, missionChallenge } from "../services/mission.service.js";

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
