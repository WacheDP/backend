import JWT from "jsonwebtoken";
import { SECURE_WORD } from "./config.js";
import { db_token } from "./modules/tokens.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = JWT.verify(token, SECURE_WORD);
    const result = await db_token(token);

    if (result == 0) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
