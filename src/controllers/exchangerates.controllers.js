import { pool } from "../database.js";

export const createexchangerate = async (req, res) => {
  try {
    const { symbol, money, rate } = req.body;

    const { rows } = await pool.query(
      "insert into exchangerates(symbol, money, rate) values($1, $2, $3) returning *",
      [symbol, money, rate]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getexchangerates = async (req, res) => {
  const response = await pool.query("select * from exchangerates");
  res.status(200).json(response.rows);
};

export const getexchangerate = async (req, res) => {
  const id = parseInt(req.params.id);

  const response = await pool.query(
    "select * from exchangerates where id = $1",
    [id]
  );

  res.json(response.rows);
};

export const updateexchangerate = async (req, res) => {
  const id = parseInt(req.params.id);
  const { money, rate } = req.body;

  const { rows } = await pool.query(
    "update exchangerates set money=$1, rate=$2 where id=$3 returning *",
    [money, rate, id]
  );

  return res.json(rows[0]);
};

export const deleteexchangerate = async (req, res) => {
  const id = parseInt(req.params.id);

  const { rowCount } = await pool.query(
    "delete from exchangerates where id=$1",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};
