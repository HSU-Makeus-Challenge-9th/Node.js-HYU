import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMissionById, addUserMission } from "../repositories/mission.repository.js";

export const missionAdd = async (data) => {
  const missionId = await addMission(data);
  const mission = await getMissionById(missionId);
  
  return responseFromMission(mission);
};

export const missionChallenge = async (data) => {
  const challengeMissionId = await addUserMission(data);
  
  return {
    challengeMissionId: challengeMissionId,
    message: "미션 도전이 시작되었습니다."
  };
};
