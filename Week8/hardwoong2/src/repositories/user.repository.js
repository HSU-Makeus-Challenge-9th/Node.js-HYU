import { prisma } from "../config/prisma.config.js";
import bcrypt from "bcrypt";
import { EmailAlreadyExistsError, InternalServerError } from "../errors/custom-error.js";

export const addUser = async (data) => {
  try {
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    // 비밀번호 해싱
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // 사용자 추가 (트랜잭션 사용)
    const user = await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        gender: data.gender,
        birth: new Date(data.birth),
        address: data.address,
        socialId: data.socialId,
        socialType: data.socialType,
        email: data.email,
        phone: data.phone,
        userStatus: 'ACTIVE',
        userType: 'GENERAL',
        agreements: {
          create: {
            isServiceAgreed: true,
            isPersonalAgreed: true,
            isLocationAgreed: true,
            isAlarmAgreed: true,
            isFourteenAgreed: true,
          }
        },
        usersPrefer: data.preferences && data.preferences.length > 0 ? {
          create: data.preferences.map(categoryId => ({
            categoryId: BigInt(categoryId)
          }))
        } : undefined
      }
    });

    return Number(user.userId);
  } catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`회원가입 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: BigInt(userId) },
      select: {
        userId: true,
        name: true,
        email: true,
        userStatus: true,
        userType: true,
        createdAt: true,
      }
    });

    if (!user) return null;

    return {
      ...user,
      userId: Number(user.userId)
    };
  } catch (err) {
    if (err.statusCode) throw err;
    throw new InternalServerError(`사용자 조회 중 오류가 발생했습니다: ${err.message}`);
  }
};
