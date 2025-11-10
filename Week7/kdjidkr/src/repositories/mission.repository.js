import {prisma} from "../db.config.js"

export const addMission = async (data) => {
    const store = await prisma.store.findFirst({where: {storeId: data.storeId}});
    if (!store) {
        return null;
    } // 존재하지 않는 가게에 대한 미션 작성 시 null 반환 후 종료

    const result = await prisma.mission.create({data: data});
    return result;
}

export const challengeMission = async (data) => {
    const checkedMission = await prisma.userMission.findFirst({
        where: {
            missionId: data.missionId,
            userId: data.userId
        }
    });
    if (checkedMission) {
        return null;
    } // 이미 도전한 미션일 경우 null 반환 후 종료

    // 시간 설정 (7일 뒤에 만료 limited_at)
    const limitedAt = new Date();
    limitedAt.setDate(limitedAt.getDate() + 7);
    const storeId = await getMission(data.missionId).then(mission => mission.storeId);

    const result = await prisma.userMission.create({
        data: {
            userId: data.userId,
            storeId: storeId,
            missionId: data.missionId,
            status: "IN_PROGRESS",
            challengeAt: new Date(),
            limitedAt: limitedAt,
        }
        
    });
    return result
}

export const getMission = async (mission_id) => {
    const mission = await prisma.mission.findFirst({where: {missionId: mission_id}});
    if (!mission) {
        return null;
    }
    return mission;
};