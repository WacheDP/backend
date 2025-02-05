import { Router } from "express";
import { getter, permissions } from "../controllers/roles.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/roles", authenticateToken, getter);
routes.get("/roles/:user", authenticateToken, permissions);

export default routes;
