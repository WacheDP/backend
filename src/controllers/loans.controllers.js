import {
  all,
  one,
  clean,
  nuevo,
  verify,
  edit,
} from "../modules/loans.modules.js";

export const search = async (req, res) => {
  try {
    const loans = await all();
    return res.status(200).json(loans);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const loan = await one(req.params.id);
    return res.json(loan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const creater = async (req, res) => {
  try {
    const loan = await nuevo(req.body);
    return res.status(201).json(loan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const loan = await edit(req.params.id, req.body);
    return res.json(loan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const verifier = async (req, res) => {
  try {
    const verified = await verify(req.params.id, req.params.id);
    return res.json(verified);
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
