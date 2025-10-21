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
} from "../repositories/mission.repository.js"

export const storeMission = async(data) =>{
    const result = await addMission(data);

    const mission = await getMission(result);
    return responseFromMission(mission);
}

export const challengeMission = async(data) =>{
    const result = await startChallenge(data);
    if(!result){
        error= new Error("이미 도전 중인 미션입니다.");
        error.statusCode = 409;
        throw error;
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
export const missionSuccessConfirm = async(body,mission_id) =>{ //verification Code 생성을 다시 생각해야 할 것 같아서 짜다 말았습니다
    const missions = await confirmMissionSuccess()
}