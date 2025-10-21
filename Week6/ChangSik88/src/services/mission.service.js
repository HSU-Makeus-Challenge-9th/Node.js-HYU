import { responseFromMission, responseFromChallenge } from "../dtos/mission.dto.js"
import {
    addMission,
    getMission,
    startChallenge,
    getChallenge,
} from "../repositories/mission.repository.js"

export const storeMission = async(data) =>{
    const result = await addMission(data);

    const mission = await getMission(result);
    return responseFromMission(mission);
}

export const challengeMission = async(data) =>{
    const result = await startChallenge(data);

    const challenge = await getChallenge(result);
    return responseFromChallenge(challenge);
}