import { Router } from "express";
import {
  timerIN,
  timerOUT,
  deleter,
  search,
  find,
  your,
  updater,
} from "../controllers/timebooks.controllers.js";
import { authenticateToken } from "../authorization.js";

const routes = Router();

routes.get("/timebooks", authenticateToken, search);
routes.get("/timebooks/:id", authenticateToken, find);
routes.get("/timebooks/employee/:employee", authenticateToken, your);
routes.post("/timebooks/timein/:employee", authenticateToken, timerIN);
routes.post("/timebooks/timeout/:id", authenticateToken, timerOUT);
routes.put("/timebooks/:id", authenticateToken, updater);
routes.delete("/timebooks/:id", authenticateToken, deleter);

export default routes;
