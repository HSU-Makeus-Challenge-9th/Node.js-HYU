import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission;`,
      [data.mission_id]
    );

    if (confirm[0].isExistMission) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO Mission (store_id, reward, mission_spec) VALUES (?, ?, ?);`,
      [
        data.mission_id,
        data.reward,
        data.mission_spec,
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

export const getMission = async (mission_id) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, mission_id);

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const startChallenge = async(data) =>{
     const conn = await pool.getConnection();
      try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM member_mission WHERE member_id = ? and mission_id = ?) as isStarted;`,
      [data.memberId, data.missionId]
    );

    if (confirm[0].isStarted) {
      throw new Error("이미 진행중인 미션입니다.");
    }

    const [result] = await pool.query(
      `INSERT INTO member_mission (member_Id,mission_Id) VALUES (?, ?);`,
      [
        data.memberId,
        data.missionId,
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

export const getChallenge = async(challengeId)=>{
    const conn = await pool.getConnection();

  try {
    const [challenge] = await pool.query(`SELECT * FROM member_mission WHERE id = ?;`,[challengeId]);

    console.log(challenge);

    if (challenge.length == 0) {
      throw new Error("미션을 찾을 수 없습니다.");
    }

    return challenge;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


