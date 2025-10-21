import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";



export const addReview = async (data) => {
  const review = await prisma.review.findFirst(
    {where: {
      user_id: data.user_id, 
      store_id: data.store_id,
    }});
    if (review){
      return null;
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
    where: {store_id: storeId, id: {gt:cursor}}, //페이지네이션을 위한 커서 지정
    orderBy:{id: "asc"},
    take: 5,
  });
  return reviews;
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