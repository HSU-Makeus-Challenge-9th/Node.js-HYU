import { addMission } from '../repositories/mission.repository.js';
import { responseFromChallengedMission, responseFromMission } from '../dtos/mission.dto.js';
import { challengeMission } from '../repositories/mission.repository.js';
import { InternalServerError } from '../errors.js';

export const missionAdd = async (data) => {
    const mission = await addMission(data);
    console.log("mission:", mission);
    if (mission === null) {
        throw new InternalServerError("미션 추가에 실패했습니다.");
    }

    return responseFromMission(mission);
}

export const missionChallenge = async (data) => {
    const mission = await challengeMission(data);
    if (mission === null) {
        throw new InternalServerError("미션 도전에 실패했습니다.");
    }
    return responseFromChallengedMission(mission);
}