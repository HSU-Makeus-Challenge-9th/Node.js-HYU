import { pool } from "../config/db.config.js";

export const requestMissionSuccess = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 미션 정보 조회
    const [missions] = await conn.query(
      `SELECT um.*, m.mission_money, m.mission_point 
       FROM user_missions um 
       JOIN missions m ON um.mission_id = m.mission_id 
       WHERE um.challenge_mission_id = ?`,
      [data.challengeMissionId]
    );
    
    if (missions.length === 0) {
      throw new Error("존재하지 않는 미션입니다.");
    }
    
    const mission = missions[0];
    
    // 자신의 미션인지 확인
    if (mission.user_id !== data.userId) {
      throw new Error("자신의 미션만 완료할 수 있습니다.");
    }
    
    // 진행 중인 미션인지 확인
    if (mission.status !== 'IN_PROGRESS') {
      throw new Error("진행 중인 미션만 완료할 수 있습니다.");
    }
    
    // 인증 코드 생성 (6자리 랜덤 숫자)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 미션 상태를 'COMPLETED'로 업데이트하고 인증 코드 저장
    await conn.query(
      `UPDATE user_missions 
       SET status = 'COMPLETED', 
           completed_at = NOW(), 
           success_id = ? 
       WHERE challenge_mission_id = ?`,
      [verificationCode, data.challengeMissionId]
    );
    
    // 사용자 포인트 업데이트
    await conn.query(
      `UPDATE users 
       SET user_point = user_point + ? 
       WHERE user_id = ?`,
      [mission.mission_point, data.userId]
    );
    
    return verificationCode;
  } catch (err) {
    throw new Error(`미션 성공 요청 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const confirmMissionSuccess = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 인증 코드로 미션 조회
    const [missions] = await conn.query(
      `SELECT um.*, m.mission_money, m.mission_point 
       FROM user_missions um 
       JOIN missions m ON um.mission_id = m.mission_id 
       WHERE um.success_id = ? AND um.user_id = ?`,
      [data.verificationCode, data.userId]
    );
    
    if (missions.length === 0) {
      throw new Error("유효하지 않은 인증 코드입니다.");
    }
    
    const mission = missions[0];
    
    // 이미 확정된 미션인지 확인
    if (mission.status !== 'COMPLETED') {
      throw new Error("완료되지 않은 미션입니다.");
    }
    
    // 미션 확정 처리 (상태는 이미 COMPLETED이므로 추가 처리 없음)
    return {
      challengeMissionId: mission.challenge_mission_id,
      missionMoney: mission.mission_money,
      missionPoint: mission.mission_point
    };
  } catch (err) {
    throw new Error(`미션 성공 확정 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};
