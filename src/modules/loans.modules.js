import { pool } from "../database.js";

export const all = async () => {
  const loans = await pool.query("select * from loans");
  return loans.rows;
};

export const one = async (id) => {
  const loan = await pool.query("select * from loans where id=$1", [id]);
  return loan.rows[0];
};

export const nuevo = async (datos) => {
  const { rate, employee, amount, razon } = datos;

  const loan = await pool.query(
    "insert into loans(rate, received, amount, due_to) values ($1, $2, $3, $4) returning *",
    [rate, employee, amount, razon]
  );

  return loan.rows[0];
};

export const verify = async (id, ci) => {
  const loan = await pool.query(
    "update loans set authorized=$1, status='To pay' where id=$2 returning *",
    [ci, id]
  );

  return loan.rows[0];
};

export const edit = async (id, datos) => {
  const sebo = one(id);

  const rate = datos.rate || sebo.rate;
  const amount = datos.amount || sebo.amount;
  const date = datos.date || sebo.date;
  const due = datos.due || sebo.due;
  const status = datos.status || sebo.status;

  const loan = await pool.query(
    "update loans set rate=$1, amount=$2, due_date=$3, due_to=$4, status=$5, updated_at=current_timestamp where id=$6 returning *",
    [rate, amount, date, due, status, id]
  );

  return loan.rows[0];
};

export const clean = async (id) => {
  const loan = await pool.query("delete from loans where id=$1", [id]);
  return loan.rowCount > 0;
};
