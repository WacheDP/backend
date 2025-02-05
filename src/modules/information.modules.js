import { pool } from "../database.js";

export const saw = async () => {
  const info = await pool.query("select * from information");
  return info.rows;
};

export const create = async (datos) => {
  const { dir } = datos;
  const phone = datos.phone || null;
  const email = datos.email || null;

  const info = await pool.query(
    "insert into information(dir, phone, email) values ($1, $2, $3) returning *",
    [dir, phone, email]
  );

  return info.rows[0];
};

export const update = async (id, datos) => {
  const data = saw();

  const dir = datos.dir || data.dir;
  const phone = datos.phone || data.phone;
  const email = datos.email || data.email;

  const info = await pool.query(
    "update dir=$1, phone=$2, email=$3 information set where id=$4 returning *",
    [dir, phone, email, id]
  );

  return info.rows[0];
};
