import { pool } from "../config/db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 가게가 존재하는지 확인
    const [stores] = await conn.query(
      `SELECT store_id FROM stores WHERE store_id = ?`,
      [data.storeId]
    );
    
    if (stores.length === 0) {
      throw new Error("존재하지 않는 가게입니다.");
    }
    
    const [result] = await conn.query(
      `INSERT INTO missions (store_id, region, mission_money, mission_point) VALUES (?, ?, ?, ?)`,
      [data.storeId, data.region, data.missionMoney, data.missionPoint]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId) => {
  const conn = await pool.getConnection();
  
  try {
    const [missions] = await conn.query(
      `SELECT * FROM missions WHERE mission_id = ?`,
      [missionId]
    );
    
    return missions.length > 0 ? missions[0] : null;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const addUserMission = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 이미 도전 중인 미션이 있는지 확인
    const [existingMissions] = await conn.query(
      `SELECT challenge_mission_id FROM user_missions 
       WHERE user_id = ? AND mission_id = ? AND status = 'IN_PROGRESS'`,
      [data.userId, data.missionId]
    );
    
    if (existingMissions.length > 0) {
      throw new Error("이미 도전 중인 미션입니다.");
    }
    
    // 미션 정보 가져오기
    const [missions] = await conn.query(
      `SELECT store_id FROM missions WHERE mission_id = ?`,
      [data.missionId]
    );
    
    if (missions.length === 0) {
      throw new Error("존재하지 않는 미션입니다.");
    }
    
    const mission = missions[0];
    
    // 제한 시간 설정 (예: 7일 후)
    const limitedAt = new Date();
    limitedAt.setDate(limitedAt.getDate() + 7);
    
    const [result] = await conn.query(
      `INSERT INTO user_missions (user_id, mission_id, store_id, status, challenge_at, limited_at) 
       VALUES (?, ?, ?, 'IN_PROGRESS', NOW(), ?)`,
      [data.userId, data.missionId, mission.store_id, limitedAt]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 도전 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};
