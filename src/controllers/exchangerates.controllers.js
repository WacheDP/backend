import {
  clean,
  create,
  search,
  edit,
  findOne,
} from "../modules/exchangerates.modules.js";

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

export const creater = async (req, res) => {
  try {
    const rate = await create(req.body);
    return res.status(201).json(rate);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const all = async (req, res) => {
  try {
    const rates = await search();
    return res.status(200).json(rates);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const one = async (req, res) => {
  try {
    const rate = await findOne(req.params.id);
    return res.json(rate);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const rate = await edit(req.params.id, req.body);
    return res.json(rate);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
