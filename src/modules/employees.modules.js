import { pool } from "../database.js";

export const getEmployees = async () => {
  const employees = await pool.query("select * from employees");
  return employees.rows;
};

export const getEmployee = async (id) => {
  const employee = await pool.query("select * from employees where id=$1", [
    id,
  ]);
  return employee.rows;
};

export const createEmployee = async (datos) => {
  const {
    ci,
    rif,
    first_name,
    middle_name,
    last_name,
    surname,
    address,
    phone,
  } = datos;
  const {
    birth_date,
    start_date,
    nationality,
    blood_type,
    allergies,
    department,
    photo,
  } = datos;

  const employee = await pool.query(
    "insert into employees(ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_date, start_date, nationality, blood_type, allergies, department, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
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

export const updateEmployee = async (id, datos) => {
  const {
    ci,
    rif,
    first_name,
    middle_name,
    last_name,
    surname,
    address,
    phone,
  } = datos;
  const {
    birth_date,
    start_date,
    nationality,
    blood_type,
    allergies,
    department,
    photo,
    status,
  } = datos;

  const employee = await pool.query(
    "update employees set ci=$1, rif=$2, first_name=$3, middle_name=$4, last_name=$5, surname=$6, address=$7, phone=$8, birth_date=$9, start_date=$10, nationality=$11, blood_type=$12, allergies=$13, department=$14, photo=$15, status=$16, updated_at=current_timestamp where id=$17 returning *",
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

  return employee.rows[0];
};

export const deleteEmployee = async (id) => {
  const employee = await pool.query("delete from employees where id=$1", [id]);

  if (employee.rowCount == 0) {
    return false;
  } else {
    return true;
  }
};
