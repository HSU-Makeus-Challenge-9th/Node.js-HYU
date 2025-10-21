export const bodyToMission = (body) => {
    return {
        storeId: body.store_id,
        costStandard: body.cost_standard,
        point: body.point
    }
}
export const bodyToMissionChallenge = (body) => {
    return {
        missionId: body.missionId,
        userId: body.userId
    }
}

export const responseFromMission = (mission) => {
    return {
        missionId: mission.missionId.toString(),
        storeId: mission.storeId.toString(),
        costStandard: mission.costStandard,
        point: mission.point
    }
}

export const responseFromChallengedMission = (challengedMission) => {
    return {
        challenge_mission_id: challengedMission.challengeMissionId.toString(),
        user_id: challengedMission.userId.toString(),
        mission_id: challengedMission.missionId.toString(),
        status: challengedMission.status,
        challenge_at: challengedMission.challengeAt,
        limited_at: challengedMission.limitedAt
    };
}
