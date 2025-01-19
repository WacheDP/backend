import { Router } from "express";
import {
  creater,
  all,
  one,
  deleter,
  updater,
  LogIn,
  LogOut,
} from "../controllers/users.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/users", authenticateToken, all);
routes.get("/users/:id", authenticateToken, one);
routes.post("/users", authenticateToken, creater);
routes.post("/users/login", LogIn);
routes.post("/users/logout/:id", authenticateToken, LogOut);
routes.put("/users/:id", authenticateToken, updater);
routes.delete("/users/:id", authenticateToken, deleter);

export default routes;
