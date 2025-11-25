import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";
import { InternalServerError, UserNotFoundError } from "../errors.js";


// Review 삽입

export const addReview = async (data) => {
    try {
    const store = await prisma.store.findFirst({where: {storeId: data.storeId}});
    if (!store) {
        throw new StoreNotFoundError();
    } // 존재하지 않는 가게에 대한 리뷰 작성 시 null 반환 후 종료
    const user = await prisma.account.findFirst({where: {userId: data.userId}});
    if (!user) {
        throw new UserNotFoundError();
    } // 존재하지 않는 유저에 대한 리뷰 작성 시 null 반환 후 종료

    const result = await prisma.review.create({data: data});
    return result;
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`리뷰 작성 중 오류가 발생했습니다.: ${err.message}`);
    };
};