import { prisma } from "../db.config.js";

export const getAllStoreReviews = async(storeId, cursor) => {
    const reviews = await prisma.Review.findMany({
        select: {
            reviewId: true,
            content: true,
            storeId: true,
            userId: true,
            score: true,
        },
        where : { storeId: storeId, reviewId: {gt : cursor}},
        orderBy: { reviewId: 'asc' },
        take: 5,
    });
    return reviews;
}