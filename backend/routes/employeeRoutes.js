import { Router } from "express";
import {editEmployee, employeeData} from "../controller/employeeController.js";
import { createEmployee } from "../controller/employeeController.js";
import { deleteEmployee } from "../controller/employeeController.js";
const employeeRouter=Router();

employeeRouter.get('/getEmployee',employeeData)
employeeRouter.post("/createEmployee",createEmployee)
employeeRouter.put("/editEmployee/:employeeId",editEmployee)
employeeRouter.delete("/deleteEmployee/:employeeId",deleteEmployee)

export default employeeRouter;