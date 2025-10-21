export const bodyToMission = (body) => {
    return {
        store_id: body.store_id,
        cost_standard: body.cost_standard,
        point: body.point,
    }
}
export const bodyToMissionChallenge = (body) => {
    return {
        mission_id: body.missionId,
        user_id: body.userId
    }
}

export const responseFromMission = (mission) => {
    return {
        mission_id: mission[0].mission_id,
        store_id: mission[0].store_id,
        cost_standard: mission[0].cost_standard,
        point: mission[0].point
    }
}

export const responseFromChallengedMission = (challengedMission) => {
    return {
        challenge_mission_id: challengedMission[0].challenge_mission_id,
        user_id: challengedMission[0].user_id,
        mission_id: challengedMission[0].mission_id,
        status: challengedMission[0].status,
        challenge_at: challengedMission[0].challenge_at,
        limited_at: challengedMission[0].limited_at
    };
}