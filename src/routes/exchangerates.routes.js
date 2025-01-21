import { Router } from "express";
import {
  deleter,
  all,
  one,
  updater,
  creater,
} from "../controllers/exchangerates.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/exchangerates", authenticateToken, all);
routes.get("/exchangerates/:id", authenticateToken, one);
routes.post("/exchangerates", authenticateToken, creater);
routes.put("/exchangerates/:id", authenticateToken, updater);
routes.delete("/exchangerates/:id", authenticateToken, deleter);

export default routes;
