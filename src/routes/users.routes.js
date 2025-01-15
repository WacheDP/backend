import { Router } from "express";
import {
  controllerCreate,
  controllerDelete,
  controllerGet,
  controllerGets,
  controllerUpdate,
} from "../controllers/users.controllers.js";

const routes = Router();

routes.get("/users", controllerGets);
routes.get("/users/:id", controllerGet);
routes.post("/users", controllerCreate);
routes.put("/users/:id", controllerUpdate);
routes.delete("/users/:id", controllerDelete);

export default routes;
