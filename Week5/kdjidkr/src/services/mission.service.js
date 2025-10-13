import { addMission } from '../repositories/mission.repository.js';
import { responseFromChallengedMission, responseFromMission } from '../dtos/mission.dto.js';
import { getMission } from '../repositories/mission.repository.js';
import { challengeMission } from '../repositories/mission.repository.js';
import { getChallengedMission } from '../repositories/mission.repository.js';

export const missionAdd = async (data) => {
    const result = await addMission(data);

    if (result === null) {
        throw new Error("미션 추가에 실패했습니다.");
    }

    const mission = await getMission(result);
    return responseFromMission(mission);
}

export const missionChallenge = async (data) => {
    const mission = await challengeMission(data);
    if (mission === null) {
        throw new Error("미션 도전에 실패했습니다.");
    }
    const ChallengedMission = await getChallengedMission(mission);
    return responseFromChallengedMission(ChallengedMission);
}