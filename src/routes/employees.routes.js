import { Router } from "express";
import {
  controllerCreate,
  controllerDelete,
  controllerGet,
  controllerGets,
  controllerUpdate,
} from "../controllers/employees.controllers.js";

const routes = Router();

routes.get("/employees", controllerGets);
routes.get("/employees/:id", controllerGet);
routes.post("/employees", controllerCreate);
routes.put("/employees/:id", controllerUpdate);
routes.delete("/employees/:id", controllerDelete);

export default routes;
