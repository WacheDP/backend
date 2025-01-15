import { SECURE_WORD } from "../config.js";
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  Login,
  newPassword,
} from "../modules/users.modules.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

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

const generateToken = (user) => {
  const crypt = { id: user.id, name: user.name, email: user.email };
  const setting = { expiresIn: "24h" };
  const token = JWT.sign(crypt, SECURE_WORD, setting);
  return token;
};

export const controllerLogin = async (req, res) => {
  const user = await Login(req.body);
  const { password } = req.body;

  try {
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        res.json({ token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const newPassword = newPassword(req.body);
    res.json(newPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
