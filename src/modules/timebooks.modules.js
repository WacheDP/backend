import { pool } from "../database.js";

export const all = async () => {
  const book = await pool.query("select * from timebooks");
  return book.rows;
};

export const own = async (employee) => {
  const book = await pool.query("select * from timebooks where employee=$1", [
    employee,
  ]);
  return book.rows;
};

export const one = async (id) => {
  const book = await pool.query("select * from timebooks where id=$1", [id]);
  return book.rows[0];
};

export const timeIN = async (employee) => {
  const book = await pool.query(
    "insert into timebooks(employee) values ($1) returning *",
    [employee]
  );
  return book.rows[0];
};

export const timeOUT = async (id) => {
  const book = await pool.query(
    "update timebooks set time_out=current_time where id=$1 returning *",
    [id]
  );
  return book.rows[0];
};

export const edit = async (id, datos) => {
  const { day, In, out } = datos;

  const book = await pool.query(
    "update timebooks set date=$1, time_in=$2, time_out=$3 updated_at=current_timestamp where id=$4 returning *",
    [day, In, out, id]
  );

  return book.rows[0];
};

export const clean = async (id) => {
  const book = await pool.query("delete from timebooks where id=$1", [id]);
  return book.rowCount > 0;
};
