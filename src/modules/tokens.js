import { pool } from "../database.js";

export const db_token = async (token) => {
  const result = await pool.query("select token from users where token=$1", [
    token,
  ]);
  return result.rowCount;
};
