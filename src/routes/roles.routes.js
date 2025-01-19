import { Router } from "express";
import getRoles from "../controllers/roles.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/roles", authenticateToken, getRoles);

export default routes;
