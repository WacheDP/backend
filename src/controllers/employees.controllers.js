import {
  findAll,
  findOne,
  Delete,
  update,
  create,
} from "../modules/employees.modules.js";

export const post = async (req, res) => {
  try {
    const employee = await create(req.body);
    return res.status(201).json(employee);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const employees = async (req, res) => {
  try {
    const employees = await findAll();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const employee = async (req, res) => {
  try {
    const employee = await findOne(req.params.id);
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const employee = await update(req.params.id, req.body);
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleter = async (req, res) => {
  try {
    if (await Delete(req.params.id)) {
      return res.sendStatus(204);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
