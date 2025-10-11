import { pool } from "../config/db.config.js";
import bcrypt from "bcrypt";

export const addUser = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    // 이메일 중복 확인
    const [existingUsers] = await conn.query(
      `SELECT user_id FROM users WHERE email = ?`,
      [data.email]
    );
    
    if (existingUsers.length > 0) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
    
    // 비밀번호 해싱
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    
    // 사용자 추가
    const [result] = await conn.query(
      `INSERT INTO users (name, gender, birth, address, social_id, social_type, email, phone, user_status, user_type) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', 'GENERAL')`,
      [data.name, data.gender, data.birth, data.address, data.socialId, data.socialType, data.email, data.phone]
    );
    
    const userId = result.insertId;
    
    // 약관 동의 추가
    await conn.query(
      `INSERT INTO agreements (user_id, is_service_agreed, is_personal_agreed, is_location_agreed, is_alarm_agreed, is_fourteen_agreed) 
       VALUES (?, true, true, true, true, true)`,
      [userId]
    );
    
    // 선호 카테고리 추가
    if (data.preferences && data.preferences.length > 0) {
      for (const categoryId of data.preferences) {
        await conn.query(
          `INSERT INTO users_prefer (user_id, category_id) VALUES (?, ?)`,
          [userId, categoryId]
        );
      }
    }
    
    return userId;
  } catch (err) {
    throw new Error(`회원가입 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getUserById = async (userId) => {
  const conn = await pool.getConnection();
  
  try {
    const [users] = await conn.query(
      `SELECT user_id, name, email, user_status, user_type, created_at 
       FROM users WHERE user_id = ?`,
      [userId]
    );
    
    return users.length > 0 ? users[0] : null;
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};
