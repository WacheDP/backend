import { SECURE_WORD } from "../config.js";
import {
  findAll,
  findOne,
  Delete,
  update,
  create,
  Login,
  Tokenon,
  Tokenoff,
} from "../modules/users.modules.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

export const creater = async (req, res) => {
  try {
    const user = await create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const all = async (req, res) => {
  try {
    const users = await findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const one = async (req, res) => {
  try {
    const user = await findOne(req.params.id);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updater = async (req, res) => {
  try {
    const user = await update(req.params.id, req.body);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleter = async (req, res) => {
  try {
    if (Delete(req.params.id)) {
      return res.sendStatus(204);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const generateToken = (id) => {
  const crypt = { id: id };
  const setting = { expiresIn: "1d" };
  const token = JWT.sign(crypt, SECURE_WORD, setting);
  return token;
};

export const LogIn = async (req, res) => {
  const user = await Login(req.body);
  const { password } = req.body;

  try {
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = generateToken(user.id);
        await Tokenon(user.id, token);
        return res.json({ token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const LogOut = async (req, res) => {
  try {
    await Tokenoff(req.params.id);
    return res.json({ message: "Successful Logout!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
