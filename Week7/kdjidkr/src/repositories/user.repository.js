import bcrypt from "bcrypt";
import { prisma } from "../db.config.js";

export const addUser = async (data) => {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  const user = await prisma.account.findFirst({where: {email: data.email}});
  if (user) {
    return null;
  }

  const created = await prisma.account.create({data: data});
  return created.userId;
}

export const getUser = async (user_id) => {
  const user = await prisma.account.findFirstOrThrow({where: {userId: user_id}});
  return user;
};


// 음식 선호 카테고리 매핑
export const setPreferences = async (userId, preferences) => {

  await prisma.foodPreference.createMany({
    data: preferences.map(foodId => ({
      userId: userId,
      foodId: foodId,
    })),
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.foodPreference.findMany({
    select: {
      id: true,
      foodId: true,
      userId: true,
    },
    where:{
      userId: userId,
    },
    orderBy: {foodId: "asc"},
  });
  return preferences;
};

export const getUserReviewsByUserId = async (userId, cursor) => {
  const limit = 5;
  const reviews = await prisma.review.findMany({
    select: {
      reviewId: true,
      content: true,
      storeId: true,
      userId: true,
      score: true,
      createdAt: true,
    },
    where : {userId: userId, 
      ...(cursor ? {reviewId: { lt : cursor }} : {}),
    },
    orderBy: { createdAt: 'asc' },
    take: limit,
  });
  return reviews.reverse();
}

export const getUserMissionsInProgressByUserId = async (userId, cursor) => {
  const limit = 5;
  const missions = await prisma.userMission.findMany({
    select: {
      challengeMissionId: true,
      userId: true,
      missionId: true,
      storeId: true,
      status: true,
      challengeAt: true,
      limitedAt: true,
      mission: {
        select: {
          costStandard: true,
          point: true,
        }
      },
      store: {
        select:{
          storeName: true,
          storeAddress: true,
        }
      }
    },
    where:{
      userId: userId,
      status: 'IN_PROGRESS',
      ...cursor ? { challengeMissionId: { lt : cursor }} : {},
    },
    orderBy: { challengeMissionId: 'desc' },
    take: limit,
  });
  return missions.reverse();
}