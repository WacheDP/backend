import { pool } from "../database.js"

export const createemployee = async (req, res) => {
    try {
        const { ci, rif, first_name, middle_name, last_name, surname, address, phone } = req.body
        const { birth_date, start_date, nationality, blood_type, allergies, department, photo } = req.body

        const { rows } = await pool.query(
            "insert into employees(ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_date, start_date, nationality, blood_type, allergies, department, photo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
            [ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_date, start_date, nationality, blood_type, allergies, department, photo]
        )

        res.status(201).json(rows[0])
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getemployees = async (req, res) => {
    const response = await pool.query('select * from employees')
    res.status(200).json(response.rows)
}

export const getemployee = async (req, res) => {
    const id = parseInt(req.params.id)

    const response = await pool.query(
        "select * from employees where id = $1",
        [id]
    )

    res.json(response.rows)
}

export const updateemployee = async (req, res) => {
    const id = parseInt(req.params.id);
    const { ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_place } = req.body
    const { birth_date, start_date, nationality, blood_type, allergies, department, photo, status } = req.body
    const { updated_at } = req.body

    const { rows } = await pool.query(
        "update employees set ci=$1, rif=$2, first_name=$3, middle_name=$4, last_name=$5, surname=$6, address=$7, phone=$8, birth_place=$9, birth_date=$10, start_date=$11, nationality=$12, blood_type=$13, allergies=$14, department=$15, photo=$16, status=$17, updated_at=$18 where id=$19 returning *",
        [ci, rif, first_name, middle_name, last_name, surname, address, phone, birth_place, birth_date, start_date, nationality, blood_type, allergies, department, photo, status, updated_at, id]
    );

    return res.json(rows[0]);
};

export const deleteemployee = async (req, res) => {
    const id = parseInt(req.params.id);

    const { rowCount } = await pool.query(
        "delete from employees where id=$1",
        [id]
    );

    if (rowCount === 0) { return res.status(404).json({ message: "User not found" }) }

    return res.sendStatus(204);
};