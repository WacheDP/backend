import { pool } from "../database.js";

const getRoles = async () => {
  const res = await pool.query("select * from roles");
  return res.rows;
};

export default getRoles;
