import { pool } from "../database.js";

const Roles = async () => {
  const res = await pool.query(
    "select * from roles where id != 'f048b4f7-2b8a-4294-9c75-daa1b1c7365b'"
  );
  return res.rows;
};

export default Roles;
