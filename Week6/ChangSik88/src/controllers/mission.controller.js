import { StatusCodes } from "http-status-codes";
import { bodyToChallenge, bodyToMission } from "../dtos/mission.dto.js";
import {challengeMission,
        storeMission,
        listStoreMissions,
        listUserMissions,
        missionSuccessRequest } from "../services/mission.service.js";


export const createMission = async (req, res, next) => {
  console.log("미션 등록 요청입니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await storeMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ 
    statusCode: 200,
    message: "미션이 성공적으로 추가되었습니다.",
    result: user });
};

export const startMission = async(req,res,next)=>{
    console.log("미션 시작 요청입니다!");
    console.log("body: ",req.body);

    const data = {
        mission_id: req.params.missionId,
        user_id: req.body.user_id,
    } 

    const challenge = await challengeMission(bodyToChallenge(data));
    res.status(StatusCodes.OK).json({ 
    statusCode: 200,
    message: "미션을 시작합니다!",
    result: challenge });
}

// 6주차 내용

export const handleListStoreMission = async (req,res,next)=>{
    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "srting" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message : "성공적으로 불러왔습니다",
        result : missions
    })
};

export const handleListUserMission = async (req,res,next) => {
    const missions = await listUserMissions(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({
        message:"성공적으로 불러왔습니다",
        result:missions
    });
};

export const handleMissionSuccessRequest = async(req,res,next) => {
    console.log("미션 완료 요청입니다!");
    console.log("body :", req.body);

    if(!req.params.missionId||!req.body.user_id){
        return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "MissionId와 userId는 필수입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    };
    const missions = await missionSuccessRequest(req.body,parseInt(req.params.missionId));
    return missions;
}
export const handleMissionSuccessConfirm = async(req,res,next) => {
    console.log("미션 완료 확정 요청입니다!");
    console.log("body :", req.body);

    if(!req.params.missionId||!req.body.user_id||!req.body.verifyCode){
        return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: 400,
        message: "확인 코드는 필수입니다.",
        error: "VALIDATION_ERROR",
        data: null
      });
    };
    const missions = await missionSuccessConfirm(req.body,parseInt(req.params.missionId));
    return missions;
}