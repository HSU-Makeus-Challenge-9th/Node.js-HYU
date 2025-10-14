import { pool } from "../config/db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO stores (store_name, store_address, store_type) VALUES (?, ?, ?)`,
      [data.storeName, data.storeAddress, data.storeType]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  
  try {
    const [stores] = await conn.query(
      `SELECT * FROM stores WHERE store_id = ?`,
      [storeId]
    );
    
    return stores.length > 0 ? stores[0] : null;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};
