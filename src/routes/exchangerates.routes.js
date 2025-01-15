import { Router } from "express";
import {
  createexchangerate,
  deleteexchangerate,
  getexchangerate,
  getexchangerates,
  updateexchangerate,
} from "../controllers/exchangerates.controllers.js";

const routes = Router();

routes.get("/exchangerates", getexchangerates);
routes.get("/exchangerates/:id", getexchangerate);
routes.post("/exchangerates", createexchangerate);
routes.put("/exchangerates", updateexchangerate);
routes.delete("/exchangerates/:id", deleteexchangerate);

export default routes;
