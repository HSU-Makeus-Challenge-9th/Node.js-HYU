import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionChallenge } from "../services/mission.service.js";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';

export const handleMissionAdd = asyncHandler(async (req, res) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);

        const mission = await missionAdd(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).success({
        message: "미션이 성공적으로 추가되었습니다.",
        data: mission
    })
});

export const handleMissionChallenge = asyncHandler(async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const missionId = req.params.missionId;
    const userId = req.body.user_id;

    if (!missionId || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).error({
            statusCode: 400,
            message: "미션 ID와 사용자 ID는 필수입니다.",
            error: "VALIDATION_ERROR",
            data: null
        });
    }

    const userMission = await missionChallenge(bodyToMissionChallenge({ missionId, userId }));
    console.log("userMission:", userMission);
    res.status(StatusCodes.OK).success({
        message: "미션 도전에 성공했습니다.",
        data: userMission
    })
});