import {pool} from "../db.config.js"

export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM store WHERE store_id = ?) as isExistStore;`,
        [data.store_id]
        );

        if (confirm[0].isExistStore === 0) {
            return null;
        } // 존재하지 않는 가게에 대한 미션 작성 시 null 반환 후 종료

        const [result] = await pool.query(
        `INSERT INTO mission (store_id, cost_standard, point) VALUES (?, ?, ?);`,
        [
            data.store_id,
            data.cost_standard,
            data.point,
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
        const [mission] = await pool.query(`SELECT * FROM mission WHERE mission_id = ?;`, mission_id);
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

export const challengeMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [confirm] = await pool.query(`SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ? and user_id = ?) as isAlreadyChallenged;`, [data.mission_id, data.user_id]);
        if (confirm[0].isAlreadyChallenged) {
            throw new Error("이미 도전한 미션입니다.");
        }
    
    // 미션 있는지 확인하기
    const [missionExist] = await pool.query(`SELECT EXISTS(SELECT 1 FROM mission WHERE mission_id = ?) as isExistMission;`, data.mission_id);
    if (missionExist[0].isExistMission === 0) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    // 시간 설정 (7일 뒤에 만료 limited_at)
    const limitedAt = new Date();
    limitedAt.setDate(limitedAt.getDate() + 7);

    const [result] = await pool.query(`INSERT INTO user_mission (user_id, mission_id, status, challenge_at, limited_at) VALUES (?, ?, "진행중", NOW(), ?);`, [data.user_id, data.mission_id, limitedAt]);
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}

export const getChallengedMission = async (challenge_mission_id) => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query(`SELECT * FROM user_mission WHERE challenge_mission_id = ?;`, challenge_mission_id);
        if (mission.length == 0) {
            throw new Error("등록된 사용자 미션을 찾을 수 없습니다.");
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