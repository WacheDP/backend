import { Router } from "express";
import {
  controllerCreate,
  controllerDelete,
  controllerGet,
  controllerGets,
  controllerLogin,
  controllerUpdate,
  resetPassword,
} from "../controllers/users.controllers.js";
import authenticateToken from "../authorization.js";

const routes = Router();

routes.get("/users", authenticateToken, controllerGets);
routes.get("/users/:id", authenticateToken, controllerGet);
routes.post("/users", authenticateToken, controllerCreate);
routes.post("/users/login", controllerLogin);
routes.put("/users/reset", resetPassword);
routes.put("/users/:id", authenticateToken, controllerUpdate);
routes.delete("/users/:id", authenticateToken, controllerDelete);

export default routes;
