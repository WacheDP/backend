import { Router } from "express";
import {
    createemployee, deleteemployee, getemployee,
    getemployees, updateemployee
} from "../controllers/employees.controllers.js";

const routes = Router()

routes.get("/employees", getemployees)
routes.get("/employees/:id", getemployee)
routes.post("/employees", createemployee)
routes.put("/employees", updateemployee)
routes.delete("/employees/:id", deleteemployee)

export default routes