
import { prisma } from "../db.config.js";
import { AlreadyReviewExist } from "../middlewares/errors.js";



export const addReview = async (data) => {
  const review = await prisma.review.findFirst(
    {where: {
      user_id: data.user_id, 
      store_id: data.store_id,
    }});
    if (review){
      throw new AlreadyReviewExist('이미 작성된 리뷰입니다.',{
        user_id: data.user_id, 
      store_id: data.store_id,});
    }
    const created = await prisma.review.create({data:data});
    return created.id;
};

export const getReview = async (review_id) => {
  const review = await prisma.review.findFirstOrThrow({where:{id:review_id}})
  return review;
};

export const getAllStoreReviews = async (storeId,cursor) =>{
  const reviews = await prisma.review.findMany({
    select: {
      id : true,
      body: true,
      store_id: true,
      user_id: true,
      score:true
    },
    where: {
      store_id: storeId,
      ...(cursor ? { id: { lt: cursor } } : {}), // lt 사용 (이전 페이지) -> O
    },
    orderBy: { id: 'desc' }, // 내림차순 정렬 -> O
    take: 5,
  });
  return reviews.reverse(); // 클라이언트에게는 오름차순으로 반환 -> O
};

export const getAllUserReviews = async (userId,cursor) =>{
  const reviews = await prisma.review.findMany({
    select: {
      id : true,
      body: true,
      store_id: true,
      user_id: true,
      score : true
    },
    where: {user_id: userId, id: {gt:cursor}}, //페이지네이션을 위한 커서 지정
    orderBy:{id: "asc"},
    take: 5,
  });
  return reviews;
};