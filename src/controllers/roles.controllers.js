import getRoles from "../modules/roles.modules.js";

const controller = async (req, res) => {
  try {
    const roles = await getRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default controller;
