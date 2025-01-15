import JWT from "jsonwebtoken";
import { SECURE_WORD } from "./config.js";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  JWT.verify(token, SECURE_WORD, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
