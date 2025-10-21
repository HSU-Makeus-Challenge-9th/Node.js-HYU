import { StatusCodes } from "http-status-codes";
import { bodyToChallenge, bodyToMission } from "../dtos/mission.dto.js";
import { challengeMission,storeMission } from "../services/mission.service.js";


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
        missionId: req.params.missionId,
        memberId: req.body.memberId,
    } 

    const challenge = await challengeMission(bodyToChallenge(data));
    res.status(StatusCodes.OK).json({ 
    statusCode: 200,
    message: "미션을 시작합니다!",
    result: challenge });
}