import { pool } from "../database.js";
import bcrypt from "bcrypt";

export const create = async (datos) => {
  const { name, role, employee, email } = datos;
  const password = await bcrypt.hash(datos.password, 12);

  const user = await pool.query(
    "insert into users(name, role, employee, password, email) values ($1, $2, $3, $4, $5) returning *",
    [name, role, employee, password, email]
  );

  return user.rows[0];
};

export const findAll = async () => {
  const users = await pool.query(
    "select id, name, role, employee, email, status, create_at, updated_at from users"
  );
  return users.rows;
};

export const findOne = async (id) => {
  const user = await pool.query(
    "select id, name, role, employee, email, status, create_at, updated_at from users where id=$1",
    [id]
  );
  return user.rows[0];
};

const validateName = async (name) => {
  const user = await pool.query("select * from users where name=$1", [name]);
  return user.rowCount > 0;
};

const validateEmail = async (email) => {
  const user = await pool.query("select * from users where email=$1", [email]);
  return user.rowCount > 0;
};

export const update = async (id, datos) => {
  const user = findOne(id);

  let name = user.name;
  let email = user.email;

  if (datos.name) {
    if (await validateName(datos.name)) {
      name = user.name;
    } else {
      name = datos.name;
    }
  }

  if (datos.email) {
    if (await validateEmail(datos.email)) {
      email = user.email;
    } else {
      email = datos.email;
    }
  }

  if (datos.password) {
    const password = await bcrypt.hash(datos.password, 12);
  }

  const role = datos.role || user.role;
  const status = datos.status || user.status;

  const New = await pool.query(
    "update users set name=$1, role=$2, password=$3, email=$4, status=$5, updated_at=current_timestamp where id=$6 returning *",
    [name, role, password, email, status, id]
  );

  return user.rows[0];
};

export const Delete = async (id) => {
  const user = await pool.query("delete from users where id=$1", [id]);
  return user.rowCount > 0;
};

export const Login = async (datos) => {
  const { name } = datos;

  const user = await pool.query(
    "select id, name, role, employee, password from users where name=$1 and (status='To verified' or status='Verified')",
    [name]
  );

  return user.rows[0];
};

export const Tokenon = async (id, token) => {
  const user = await pool.query(
    "update users set token=$1 where id=$2 returning *",
    [token, id]
  );

  return user.rows[0];
};

export const Tokenoff = async (id) => {
  const user = await pool.query(
    "update users set token=null where id=$1 returning *",
    [id]
  );
  return user.rows[0];
};
