
import { prisma } from "../db.config.js";
import { AlreadyEmailExistError } from "../middlewares/errors.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    throw new AlreadyEmailExistError('이미 존재하는 이메일입니다.', {email:data.email});
  }

  const created= await prisma.user.create({ data: data});
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.flavor_check.create({
    data: {
      user: {connect:{id:userId}},
      flavor: {connect:{id:foodCategoryId}},
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.flavor_check.findMany({
    where: { user_id: userId },
    select: {
      flavor:{
        select:{
          id:true,
          name:true
        }
      }
    },
    orderBy: { category_id: "asc" },
  });

  return preferences;
};