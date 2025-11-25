import {responseFromMission, 
        responseFromChallenge,
        responseFromMissions,
        responseFromMissionSuccess, } from "../dtos/mission.dto.js"
import {
    addMission,
    getMission,
    startChallenge,
    getChallenge,
    getAllStoreMissions,
    getAllUserMissions,
    requestMissionSuccess,
    updateMissionStatus,
    checkVerifyCode
} from "../repositories/mission.repository.js"
import { MissionAlreadyChallengeError } from "../middlewares/errors.js";

export const storeMission = async(data) =>{
    const result = await addMission(data);

    const mission = await getMission(result);
    return responseFromMission(mission);
}

export const challengeMission = async(data) =>{
    const result = await startChallenge(data);
    if(!result){
        throw new MissionAlreadyChallengeError("이미 진행중인 미션입니다.", data)
    }

    const challenge = await getChallenge(result);
    return responseFromChallenge(challenge);
}

//6주차 내용

export const listStoreMissions = async (store_id,cursor) => {
    const missions = await getAllStoreMissions(store_id,cursor);
    return responseFromMissions(missions);
}

export const listUserMissions = async (user_id,cursor) => {
    const missions = await getAllUserMissions(user_id,cursor);
    return responseFromMissions(missions);
};

export const missionSuccessRequest = async(user_id,mission_id)=>{
    const missions = await requestMissionSuccess(user_id,mission_id);
    return responseFromMissionSuccess(missions);
}

// mission.service.js
export const missionSuccessConfirm = async (userId, missionId,verifyCode) => {
  //확인코드 체크
  await checkVerifyCode(userId,missionId,verifyCode);
  // 상태를 "진행완료"로 업데이트
  const completed = await updateMissionStatus(userId, missionId, '진행완료');
  return completed;
};
