import { prisma } from "../db.config.js";

export const getAllStoreReviews = async(storeId, cursor) => {
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
}


export const getStoreMissions = async(storeId, cursor) => {
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
};