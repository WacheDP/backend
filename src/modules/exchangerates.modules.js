import { pool } from "../database.js";

export const search = async () => {
  const rate = await pool.query("select * from exchangerates");
  return rate.rows[0];
};

export const findOne = async (id) => {
  const rate = await pool.query("select * from exchangerates where id=$1", [
    id,
  ]);

  return rate.rows[0];
};

export const create = async (datos) => {
  const { money, value } = datos;

  const rate = await pool.query(
    "insert into exchangerates(symbol, rate) values ($1, $2) returning *",
    [money, value]
  );

  return rate.rows[0];
};

export const edit = async (id, datos) => {
  const { money, value } = datos;

  const rate = await pool.query(
    "update exchangerates set symbol=$1, rate=$2 where id=$3 returning *",
    [money, value, id]
  );

  return rate.rows[0];
};

export const clean = async (id) => {
  const rate = await pool.query("delete from exchangerates where id=$1", [id]);
  return rate.rowCount > 0;
};
