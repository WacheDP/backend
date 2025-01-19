import { create, update, saw } from "../modules/information.modules.js";

export const setting = async (req, res) => {
  try {
    const info = create(req.body);
    return res.status(201).json(info);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getters = async (req, res) => {
  try {
    const info = saw();
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const info = update(req.params.id, req.body);
    return res.json(info);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
