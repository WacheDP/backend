import { Router } from "express";
import {
  search,
  findOne,
  creater,
  VACupdater,
} from "../controllers/vacations.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/vacations", search);
routes.get("/vacations/:id", findOne);
routes.post("/vacations", creater);
routes.put("/vacations/:id", VACupdater);

export default routes;
