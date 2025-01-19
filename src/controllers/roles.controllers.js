import Roles from "../modules/roles.modules.js";

const getter = async (req, res) => {
  try {
    const roles = await Roles();
    return res.json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default getter;
