import express from "express";
import { PORT_SERVER } from "./config.js";
import RolesRoutes from "./routes/roles.routes.js";
import EmployeesRoutes from "./routes/employees.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import ExchangeratesRoutes from "./routes/exchangerates.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(RolesRoutes);
app.use(EmployeesRoutes);
app.use(UsersRoutes);
app.use(ExchangeratesRoutes);

app.listen(PORT_SERVER);
console.log("Servidor " + PORT_SERVER + " en linea");
