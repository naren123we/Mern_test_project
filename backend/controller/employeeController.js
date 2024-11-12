

import employeeModel from "../model/employeeModel.js";

const employeeData = async (req, res) => {
  try {
    const employeeData = await employeeModel.find();
    res.status(200).json({ employeeData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee data", error: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image=req.files.imagefile;
    const img=imageUpload(image)
    const newEmployee = new employeeModel({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image:img
    });
  
    await newEmployee.save();
    res.status(201).json({ message: "Added new employee", newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    console.log('Deleting employee with ID:', employeeId); 
    const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);
    res.status(200).json({ message: 'Employee deleted', deletedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { name, email, mobile, designation, gender, courses } = req.body; 
    const image=req.files.imagefile;
    const img=imageUpload(image)
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      { name, email, mobile, designation, gender, courses,image:img },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: "Employee updated", updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};


export { employeeData, createEmployee, deleteEmployee, editEmployee };
