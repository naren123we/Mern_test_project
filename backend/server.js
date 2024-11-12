import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./dotenv/.env" });
const port = process.env.PORT;
const URL = process.env.databaseURL;

app.use('/',employeeRouter)
app.use('/',adminRouter)

app.listen(port, () => {
  mongoose
    .connect(URL)
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log(error));
  console.log(`server is running ${port}`);
});
