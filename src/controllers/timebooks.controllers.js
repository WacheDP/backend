import {
  edit,
  clean,
  timeIN,
  timeOUT,
  all,
  one,
  own,
} from "../modules/timebooks.modules.js";

export const timerIN = async (req, res) => {
  try {
    const book = await timeIN(req.params.employee);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const timerOUT = async (req, res) => {
  try {
    const book = await timeOUT(req.params.id);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleter = async (req, res) => {
  try {
    if (await clean(req.params.id)) {
      return res.sendStatus(204);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const search = async (req, res) => {
  try {
    const book = await all();
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const find = async (req, res) => {
  try {
    const book = await one(req.params.id);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const your = async (req, res) => {
  try {
    const book = await own(req.params.employee);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const book = await edit(req.params.id, req.body);
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
