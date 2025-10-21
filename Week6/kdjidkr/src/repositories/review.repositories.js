import { prisma } from "../db.config.js";

// Review 삽입

export const addReview = async (data) => {
    const store = await prisma.store.findFirst({where: {storeId: data.storeId}});
    if (!store) {
        return null;
    } // 존재하지 않는 가게에 대한 리뷰 작성 시 null 반환 후 종료

    const result = await prisma.review.create({data: data});
    return result;
};