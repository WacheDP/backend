import { Router } from "express";
import { createuser, deleteuser, getuser, getusers, login, updateuser } from "../controllers/users.controllers.js";

const routes = Router()

routes.get("/users", getusers)
routes.get("/users/:id", getuser)
routes.get("/users/login", login)
routes.post("/users", createuser)
routes.put("/users", updateuser)
routes.delete("/users/:id", deleteuser)

export default routes