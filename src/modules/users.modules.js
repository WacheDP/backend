import { json } from "express";
import { pool } from "../database.js";
import bcrypt from "bcrypt";

export const createUser = async (datos) => {
  const { name, role, employee, password, email } = datos;
  const hash = await bcrypt.hash(password, 12);

  const user = await pool.query(
    "insert into users(name, role, employee, password, email) values ($1, $2, $3, $4, $5) returning *",
    [name, role, employee, hash, email]
  );

  return user.rows[0];
};

export const getUsers = async () => {
  const users = await pool.query("select * from users");
  return users.rows;
};

export const getUser = async (id) => {
  const user = await pool.query("select * from users where id=$1", [id]);
  return user.rows;
};

export const updateUser = async (id, datos) => {
  const { name, role, employee, password, email, status } = datos;
  const hash = await bcrypt.hash(password, 12);

  const user = await pool.query(
    "update users set SET name=$1, role=$2, employee=$3, password=$4, email=$5, status=$6, updated_at=current_timestamp where id=$7",
    [name, role, employee, hash, email, status, id]
  );

  return user.rows[0];
};

export const deleteUser = async (id) => {
  const user = await pool.query("delete from users where id=$1", [id]);

  if (user.rowCount == 0) {
    return false;
  } else {
    return true;
  }
};

export const Login = async (datos) => {
  const { id } = datos;

  const user = await pool.query(
    "select id, name, password, email from users where (name=$1 or email=$2) and (status='To verified' or status='verified')",
    [id, id]
  );
  return user.rows[0];
};

export const newPassword = async (datos) => {
  const { password, name, email } = datos;

  const user = await pool.query(
    "select id from users where name=$1 and email=$2",
    [name, email]
  );

  if (user.rowCount != 0) {
    const newPassword = bcrypt.hash(password, 12);
    const reset = await pool.query("update users password=$1 where id=$2", [
      newPassword,
      id,
    ]);

    return reset.rows[0];
  } else {
    return json({ message: "User not found" });
  }
};
