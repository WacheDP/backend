import { getpermiso, Roles } from "../modules/roles.modules.js";

export const getter = async (req, res) => {
  try {
    const roles = await Roles();
    return res.json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const permissions = async (req, res) => {
  try {
    const permisos = await getpermiso(req.params.user);
    return res.json(permisos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
