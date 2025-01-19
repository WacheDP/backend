import { Router } from "express";
import {
  getters,
  setting,
  updater,
} from "../controllers/information.controllers.js";

const routes = Router();

routes.get("/information", getters);
routes.post("/information", setting);
routes.put("/information", updater);

export default routes;
