import { pool } from "../database.js";

export const Roles = async () => {
  const res = await pool.query(
    "select * from roles where id != 'f048b4f7-2b8a-4294-9c75-daa1b1c7365b'"
  );
  return res.rows;
};

export const getpermiso = async (user) => {
  const permisos = await pool.query(
    "select r.permissions from roles as r, users as u where u.id=$1 and u.role=r.id",
    [user]
  );
  return permisos.rows[0];
};
