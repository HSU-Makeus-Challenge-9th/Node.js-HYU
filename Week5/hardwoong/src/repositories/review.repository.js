import { pool } from "../config/db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 먼저 challengeMissionId로 user_missions에서 정보를 가져옴
    const [userMission] = await conn.query(
      `SELECT um.user_id, um.store_id, s.store_name 
       FROM user_missions um 
       JOIN stores s ON um.store_id = s.store_id 
       WHERE um.challenge_mission_id = ? AND um.status = 'COMPLETED'`,
      [data.challengeMissionId]
    );
    
    if (userMission.length === 0) {
      throw new Error("완료된 미션을 찾을 수 없습니다.");
    }
    
    const mission = userMission[0];
    
    // 이미 해당 미션에 대해 리뷰가 작성되었는지 확인 - 중복로직 문제 생겨서 임시 비활성화 🥲😭
    // const [existingReview] = await conn.query(
    //   `SELECT r.review_id 
    //    FROM reviews r 
    //    JOIN user_missions um ON r.user_id = um.user_id AND r.store_id = um.store_id 
    //    WHERE um.challenge_mission_id = ?`,
    //   [data.challengeMissionId]
    // );
    
    // if (existingReview.length > 0) {
    //   throw new Error("이미 리뷰를 작성한 미션입니다.");
    // }
    
    // 리뷰 추가
    const [result] = await conn.query(
      `INSERT INTO reviews (store_id, user_id, review_text, score) VALUES (?, ?, ?, ?)`,
      [mission.store_id, mission.user_id, data.content, data.rating]
    );
    
    // 리뷰 이미지 추가
    if (data.images && data.images.length > 0) {
      for (const image of data.images) {
        await conn.query(
          `INSERT INTO review_imgs (review_id, review_img) VALUES (?, ?)`,
          [result.insertId, image]
        );
      }
    }
    
    return {
      reviewId: result.insertId,
      storeName: mission.store_name
    };
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};
