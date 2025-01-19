import { Router } from "express";
import {
  post,
  employee,
  employees,
  updater,
  deleter,
} from "../controllers/employees.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/employees", authenticateToken, employees);
routes.get("/employees/:id", authenticateToken, employee);
routes.post("/employees", authenticateToken, post);
routes.put("/employees/:id", authenticateToken, updater);
routes.delete("/employees/:id", authenticateToken, deleter);

export default routes;
