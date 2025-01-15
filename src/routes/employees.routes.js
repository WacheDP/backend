import { Router } from "express";
import {
  controllerCreate,
  controllerDelete,
  controllerGet,
  controllerGets,
  controllerUpdate,
} from "../controllers/employees.controllers.js";
import authenticateToken from "../authorization.js";

const routes = Router();

routes.get("/employees", authenticateToken, controllerGets);
routes.get("/employees/:id", authenticateToken, controllerGet);
routes.post("/employees", authenticateToken, controllerCreate);
routes.put("/employees/:id", authenticateToken, controllerUpdate);
routes.delete("/employees/:id", authenticateToken, controllerDelete);

export default routes;
