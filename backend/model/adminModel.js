import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
  });
  
  const adminModel = mongoose.model("admin", adminSchema);

  export default adminModel;