import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../modules/users.modules.js";

export const controllerCreate = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const controllerGets = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerGet = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUser(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await updateUser(id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerDelete = async (req, res) => {
  const id = req.params.id;

  try {
    if (deleteUser(id)) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
