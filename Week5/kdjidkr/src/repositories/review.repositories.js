import { pool } from "../db.config.js";


// Review 삽입
export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM review WHERE store_id = ?) as isExistStore;`,
            [data.store_id]
        );

        if (confirm[0].isExistStore === 0) {
            return null;
        } // 존재하지 않는 가게에 대한 리뷰 작성 시 null 반환 후 종료

        const [result] = await pool.query(
            `INSERT INTO review (user_id, store_id, score, content) VALUES (?, ?, ?, ?);`,
            [
                data.user_id,
                data.store_id,
                data.score,
                data.content,
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
        const [review] = await pool.query(`SELECT * FROM review WHERE review_id = ?;`, review_id);
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