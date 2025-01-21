import { Router } from "express";
import { authenticateToken } from "../authorization.js";
import {
  search,
  findOne,
  deleter,
  updater,
  creater,
} from "../controllers/loans.controllers.js";

const routes = Router();

routes.get("/loans", authenticateToken, search);
routes.get("/loans/:id", authenticateToken, findOne);
routes.post("/loans", authenticateToken, creater);
routes.put("/loans/:id", authenticateToken, updater);
routes.delete("/loans/:id", authenticateToken, deleter);

export default routes;
