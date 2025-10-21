import { prisma } from "../config/prisma.config.js";

export const addStore = async (data) => {
  try {
    const store = await prisma.store.create({
      data: {
        storeName: data.storeName,
        storeAddress: data.storeAddress,
        storeType: data.storeType,
      }
    });

    return Number(store.storeId);
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const getStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { storeId: BigInt(storeId) }
    });

    if (!store) return null;

    return {
      ...store,
      storeId: Number(store.storeId),
      storeScore: store.storeScore ? parseFloat(store.storeScore) : null
    };
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다: ${err.message}`);
  }
};
