import { Router } from "express";
import getRoles from "../controllers/roles.controllers.js";

const routes = Router();

routes.get("/roles", getRoles);

export default routes;
