import { Router } from "express";
import {adminData,authentication} from "../controller/adminController.js";

const adminRouter=Router();

adminRouter.get('/admin',adminData)
adminRouter.post('/authentication',authentication)

export default adminRouter;