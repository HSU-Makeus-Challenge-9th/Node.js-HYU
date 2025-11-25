import {prisma} from "../db.config.js"
import { StoreNotFoundError } from "../errors.js";
import { MissionNotFoundError, AlreadyChallengedMissionError } from "../errors.js";
import { UserNotFoundError } from "../errors.js";

export const addMission = async (data) => {
    const store = await prisma.store.findFirst({where: {storeId: data.storeId}});
    if (!store) {
        throw new StoreNotFoundError();
    } // 존재하지 않는 가게에 대한 미션 작성 시 null 반환 후 종료

    const result = await prisma.mission.create({data: data});
    return result;
}

export const challengeMission = async (data) => {
    try {
    const user = await prisma.account.findFirst({where: {userId: data.userId}});
    if (!user) {
        throw new UserNotFoundError();
    }

    const mission = await prisma.mission.findFirst({where: {missionId: data.missionId}});
    if (!mission) {
        throw new MissionNotFoundError();
    }

    const checkedMission = await prisma.userMission.findFirst({
        where: {
            missionId: data.missionId,
            userId: data.userId
        }
    });
    if (checkedMission) {
        throw new AlreadyChallengedMissionError();
    } // 이미 도전한 미션일 경우 예외 발생

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
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`미션 도전 중 오류가 발생했습니다.: ${err.message}`);
  }
}

export const getMission = async (mission_id) => {
    try {
    const mission = await prisma.mission.findFirst({where: {missionId: mission_id}});
    if (!mission) {
        throw new MissionNotFoundError();
    }
    return mission;
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`미션 조회 중 오류가 발생했습니다.: ${err.message}`);
  };
};