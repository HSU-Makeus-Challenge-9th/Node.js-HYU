import { pool } from "../db.config.js";
import bcrypt from "bcrypt";

// User 데이터 삽입
export const addUser = async (data) => {
  console.log("addUser 호출됨, data:", data);
  const conn = await pool.getConnection();
  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM account WHERE email = ?) as isExistEmail;`,
      data.email // ?는 플레이스 홀더로 data.email로 대체됨 (SQL Injection 방지)
    ); // 배열 비구조화 할당, 즉 pool.query의 결과 중 첫 번째 요소만 confirm에 할당

    if (confirm[0].isExistEmail) {
      return null;
    } // 이메일이 이미 존재하면 null 반환 후 종료

    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const [result] = await pool.query(
      `INSERT INTO account (name, gender, birthdate, address, phone, email) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.phoneNumber,
        data.email,
      ]
    ); // 이메일이 존재하지 않으면 사용자 정보 삽입

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (user_id) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM account WHERE user_id = ?;`, user_id);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO food_preference (food_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT fp.id, fp.food_id, fp.user_id, fl.name " +
        "FROM food_preference fp JOIN food_list fl on fp.food_id = fl.food_id " +
        "WHERE fp.user_id = ? ORDER BY fp.food_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
