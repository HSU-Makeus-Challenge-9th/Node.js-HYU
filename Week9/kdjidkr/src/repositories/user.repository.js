import bcrypt from "bcrypt";
import { prisma } from "../db.config.js";
import { InternalServerError, UserNotFoundError } from "../errors.js";
import { DuplicateUserEmailError } from "../errors.js";

export const addUser = async (data) => {
  try {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  const user = await prisma.account.findFirst({where: {email: data.email}});
  if (user) {
    throw new DuplicateUserEmailError();
  }

  const created = await prisma.account.create({data: data});
  return created.userId;
  } catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`회원가입 중 오류가 발생했습니다.: ${err.message}`);
  }
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
  try {
  const user = await prisma.account.findFirst({where: {userId: userId}});
  if (!user) {
    throw new UserNotFoundError();
  }

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
  } catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`사용자 리뷰 조회 중 오류가 발생했습니다.: ${err.message}`);
  }
}

export const getUserMissionsInProgressByUserId = async (userId, cursor) => {
  try {
  const user = await prisma.account.findFirst({where: {userId: userId}});
  if (!user) {
    throw new UserNotFoundError();
  }
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
} catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`사용자 진행중인 미션 조회 중 오류가 발생했습니다.: ${err.message}`);
  }
}

export const updateUser = async (userId, data) => {
  try {
    const updateData = {};

    if (data.name) updateData.name = data.name;
    if (data.gender) updateData.gender = data.gender;
    if (data.birthdate) updateData.birthdate = data.birthdate;
    if (data.address) updateData.address = data.address;
    if (data.phone) updateData.phone = data.phone;

    if (data.preferences) {
      await prisma.foodPreference.deleteMany({ where: { userId: BigInt(userId) } });
      await setPreferences(userId, data.preferences);
    }
    
    const user = await prisma.account.update({
      where: { userId: BigInt(userId) },
      data: updateData,
    });

    return user;
  } catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`사용자 정보 업데이트 중 오류가 발생했습니다.: ${err.message}`);
  }
  }
