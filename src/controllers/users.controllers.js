import { pool } from "../database.js"

export const createuser = async (req, res) => {
    try {
        const { name, role, employee, password, email } = req.body

        const { rows } = await pool.query(
            "insert into users(name, role, employee, password, email) values ($1, $2, $3, $4, $5) RETURNING *",
            [name, role, employee, password, email]
        )

        res.status(201).json(rows[0])
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getusers = async (req, res) => {
    const response = await pool.query('select * from users')
    res.status(200).json(response.rows)
}

export const getuser = async (req, res) => {
    const id = parseInt(req.params.id)

    const response = await pool.query(
        "select * from users where id = $1",
        [id]
    )

    res.json(response.rows)
}

export const updateuser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, role, employee, password, email, status, updated_at } = req.body

    const { rows } = await pool.query(
        "update users set name=$1, role=$2, employee=$3, password=$4, email=$5, status=$6, updated_at=$7 where id=$8 returning *",
        [name, role, employee, password, email, status, updated_at, id]
    );

    return res.json(rows[0]);
};

export const deleteuser = async (req, res) => {
    const id = parseInt(req.params.id);

    const { rowCount } = await pool.query(
        "delete from users where id=$1",
        [id]
    );

    if (rowCount === 0) { return res.status(404).json({ message: "User not found" }) }

    return res.sendStatus(204);
};

export const login = async (req, res) => {
    const { name, key, email } = req.body

    const { rows } = await pool.query(
        "select * from users where name=$1 and email=$2",
        [name, email]
    )
    const { password } = rows[0]

    if (key == password) {
        res.json({ message: "Welcome!" })
    }
    else {
        res.status(401).json({ message: "Incorrect Password" })
    }
}