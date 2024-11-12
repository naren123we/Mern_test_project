import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    
      
    },
    image:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
  });
  
  
  const employeeModel = mongoose.model("employee", employeeSchema);
  export default employeeModel