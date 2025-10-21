import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
      [data.store_id]
    );

    if (confirm[0].isExistStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO review (member_id, store_id, score,body) VALUES (?, ?, ?, ?);`,
      [
        data.member_id,
        data.store_id,
        data.score,
        data.body,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getReview = async (review_id) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, review_id);

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getAllStoreReviews = async (storeId,cursor) =>{
  const reviews = await prisma.review.findmany({
    select: {
      id : true,
      content: true,
      store: true,
      user: true,
    },
    where: {storeId: storeId, id: {gt:cursor}}, //페이지네이션을 위한 커서 지정
    orderBy:{id: "asc"},
    take: 5,
  });
  return reviews;
};