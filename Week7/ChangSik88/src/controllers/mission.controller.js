import { StatusCodes } from "http-status-codes";
import { bodyToChallenge, bodyToMission } from "../dtos/mission.dto.js";
import {challengeMission,
        storeMission,
        listStoreMissions,
        listUserMissions,
        missionSuccessRequest } from "../services/mission.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { ValidationError } from "../middlewares/errors.js";

export const createMission = asyncHandler(async (req, res, next) => {
  console.log("미션 등록 요청입니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await storeMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ 
    message: "미션이 성공적으로 추가되었습니다.",
    result: user });
});

export const startMission = asyncHandler(async(req,res,next)=>{
    console.log("미션 시작 요청입니다!");
    console.log("body: ",req.body);

    const data = {
        mission_id: req.params.missionId,
        user_id: req.body.user_id,
    } 
    if(!user_id){
        throw new ValidationError("사용자 ID는 필수입니다.",req.body);
    };

    const challenge = await challengeMission(bodyToChallenge(data));
    res.status(StatusCodes.OK).json({ 
    message: "미션을 시작합니다!",
    result: challenge });
});

// 6주차 내용

export const handleListStoreMission = asyncHandler(async (req,res,next)=>{
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message : "성공적으로 불러왔습니다",
        result : missions
    })
});

export const handleListUserMission = asyncHandler(async (req,res,next) => {
    const missions = await listUserMissions(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message:"성공적으로 불러왔습니다",
        result:missions
    });
});

export const handleMissionSuccessRequest = asyncHandler(async(req,res,next) => {
    console.log("미션 완료 요청입니다!");
    console.log("body :", req.body);

    if(!req.params.missionId||!req.body.user_id){
        throw new ValidationError("MissionId와 userId는 필수입니다.",req.body)
    };
    const missions = await missionSuccessRequest(req.body,parseInt(req.params.missionId));
    return missions;
});
export const handleMissionSuccessConfirm = asyncHandler(async(req,res,next) => {
    console.log("미션 완료 확정 요청입니다!");
    console.log("body :", req.body);

    if(!req.params.missionId||!req.body.user_id||!req.body.verifyCode){
        throw new ValidationError("확인 코드는 필수입니다.",req.body);
      };
    const missions = await missionSuccessConfirm(req.body,parseInt(req.params.missionId));
    return missions;
});