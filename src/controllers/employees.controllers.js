import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../modules/employees.modules.js";

export const controllerCreate = async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerGets = async (req, res) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerGet = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await getEmployee(id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerUpdate = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await updateEmployee(id, req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const controllerDelete = async (req, res) => {
  const id = req.params.id;

  try {
    if (deleteEmployee(id)) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
