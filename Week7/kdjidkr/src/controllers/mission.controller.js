import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionChallenge } from "../services/mission.service.js";
import { bodyToMissionChallenge } from "../dtos/mission.dto.js";

export const handleMissionAdd = async (req, res) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);

    try{
        const mission = await missionAdd(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({
        success: true,
        message: "미션이 성공적으로 추가되었습니다.",
        data: mission
    })
    }
    catch (error) {
        console.error("미션 추가 중 오류 발생:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: "미션 추가에 실패했습니다.",
            error: error.message
        })
    }    
}

export const handleMissionChallenge = async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const missionId = req.params.missionId;
    const userId = req.body.user_id;

    if (!missionId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: 400,
            message: "미션 ID는 필수입니다.",
            error: "VALIDATION_ERROR",
            data: null
        });
    }

    if (!userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: 400,
            message: "사용자 ID는 필수입니다.",
            error: "VALIDATION_ERROR",
            data: null
        });
    }
    try{
        const userMission = await missionChallenge(bodyToMissionChallenge({ missionId, userId }));
        console.log("userMission:", userMission);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "미션 도전에 성공했습니다.",
        data: userMission
    })
}
    catch (error) {
        console.error("미션 도전 중 오류 발생:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: "미션 도전에 실패했습니다.",
            error: error.message
        })
    }
}