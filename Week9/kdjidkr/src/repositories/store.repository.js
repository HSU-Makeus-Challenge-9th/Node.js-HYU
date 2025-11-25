import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";

export const getAllStoreReviews = async(storeId, cursor) => {
    try {
    const store = await prisma.store.findFirst({where: {storeId: storeId}});
    if (!store) {
        throw new StoreNotFoundError();
    }

    const reviews = await prisma.review.findMany({
        select: {
            reviewId: true,
            content: true,
            storeId: true,
            userId: true,
            score: true,
        },
        where : { storeId: storeId, ...(cursor ? {reviewId: { lt : cursor }} : {})},
        orderBy: { reviewId: 'asc' },
        take: 5,
    });
    return reviews.reverse();
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`가게 리뷰 조회 중 오류가 발생했습니다.: ${err.message}`);
  }
};

export const getStoreMissions = async(storeId, cursor) => {
    try {
    const store = await prisma.store.findFirst({where: {storeId: storeId}});
    if (!store) {
        throw new StoreNotFoundError();
    }

    const missions = await prisma.mission.findMany({
        select: {
            missionId: true,
            storeId: true,
            costStandard: true,
            point: true
        },
        where: {
            storeId: storeId, 
            ...cursor ? { missionId: { lt : cursor }} : {},
        },
        orderBy: { missionId: 'desc' },
        take: 5,
    });
    return missions.reverse();
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`가게 미션 조회 중 오류가 발생했습니다.: ${err.message}`);
  }
};