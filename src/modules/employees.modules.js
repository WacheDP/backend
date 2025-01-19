import { pool } from "../database.js";

export const findAll = async () => {
  const employees = await pool.query("select * from employees");
  return employees.rows;
};

export const findOne = async (id) => {
  const employee = await pool.query("select * from employees where id=$1", [
    id,
  ]);
  return employee.rows[0];
};

export const create = async (datos) => {
  const { ci, rif, first_name, last_name, address, birth_date } = datos;
  const { start_date, nationality, blood_type } = datos;
  const { allergies, department, photo } = datos;

  const middle_name = datos.middle_name || null;
  const surname = datos.surname || null;
  const phone = datos.phone || null;

  const employee = await pool.query(
    "insert into employees(ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_date, start_date, nationality, blood_type, allergies, department, photo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
    [
      ci,
      rif,
      first_name,
      middle_name,
      last_name,
      surname,
      address,
      phone,
      birth_date,
      start_date,
      nationality,
      blood_type,
      allergies,
      department,
      photo,
    ]
  );

  return employee.rows[0];
};

const validateCI = async (ci) => {
  const c = await pool.query("select id from employees where ci=$1", [ci]);
  return c.rowCount > 0;
};

const validateRIF = async (rif) => {
  const r = await pool.query("select id from employees where rif=$1", [rif]);
  return r.rowCount > 0;
};

export const update = async (id, datos) => {
  const user = await findOne(id);

  let ci = user.ci;
  let rif = user.rif;

  if (datos.ci) {
    if (await validateCI(datos.ci)) {
      ci = user.ci;
    } else {
      ci = datos.ci;
    }
  }

  if (datos.rif) {
    if (await validateRIF(datos.rif)) {
      rif = user.rif;
    } else {
      rif = datos.rif;
    }
  }

  const first_name = datos.first_name || user.first_name;
  const middle_name = datos.middle_name || user.middle_name;
  const last_name = datos.last_name || user.last_name;
  const surname = datos.surname || user.surname;
  const address = datos.address || user.address;
  const phone = datos.phone || user.phone;
  const birth_date = datos.birth_date || user.birth_date;
  const start_date = datos.start_date || user.start_date;
  const nationality = datos.nationality || user.nationality;
  const blood_type = datos.blood_type || user.blood_type;
  const allergies = datos.allergies || user.allergies;
  const department = datos.department || user.department;
  const photo = datos.photo || user.photo;
  const status = datos.status || user.status;

  const put = await pool.query(
    "update employees set ci=$1, rif=$2, first_name=$3, middle_name=$4, last_name=$5, surname=$6, address=$7, phone=$8, birth_date=$9, start_date=$10, nationality=$11, blood_type=$12, allergies=$13, department=$14, photo=$15, status=$16, updated_at=current_timestamp WHERE id=$17 returning *",
    [
      ci,
      rif,
      first_name,
      middle_name,
      last_name,
      surname,
      address,
      phone,
      birth_date,
      start_date,
      nationality,
      blood_type,
      allergies,
      department,
      photo,
      status,
      id,
    ]
  );

  return put.rows[0];
};

export const Delete = async (id) => {
  const employee = await pool.query("delete from employees where id=$1", [id]);
  return employee.rowCount > 0;
};
