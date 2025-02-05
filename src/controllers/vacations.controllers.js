import { all, one, create, updateVAC } from "../modules/vacations.modules.js";

export const VACupdater = async (req, res) => {
  try {
    const vacation = await updateVAC(req.params.id, req.body.vacation);
    return res.json(vacation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const creater = async (req, res) => {
  try {
    const vacation = await create(req.body);
    return res.status(201).json(vacation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const vacation = await one(req.params.id);
    return res.status(200).json(vacation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const search = async (req, res) => {
  try {
    const vacations = await all();
    return res.status(200).json(vacations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
