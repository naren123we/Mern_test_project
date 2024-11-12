

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: "",
    file:"",
  });

const validateForm = () => {
  const newError = { ...error };
  let isValid = true;

  if (name === "") {
    newError.name = "Name is required";
    isValid = false;
  } else {
    newError.name = "";
  }

  if (email === "") {
    newError.email = "Email is required";
    isValid = false;
  } else {
    newError.email = "";
  }

  if (mobile === "") {
    newError.mobile = "Mobile is required";
    isValid = false;
  } else {
    newError.mobile = "";
  }

  if (designation === "") {
    newError.designation = "Designation is required";
    isValid = false;
  } else {
    newError.designation = "";
  }

  if (gender === "") {
    newError.gender = "Gender is required";
    isValid = false;
  } else {
    newError.gender = "";
  }
if(file===null)
{
  newError.file="Upload the image"
  isValid=false;
}
else{
  newError.file=""
}
  setError(newError);

  return isValid;
};


const handleCheckboxChange = (e) => {
  const { checked, value } = e.target;

  if (checked) {
    setCourses((prevCourses) => [...prevCourses, value]);
  } else {
    setCourses((prevCourses) => prevCourses.filter((course) => course !== value));
  }
};
const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

  const adminCreateEmployee = async (e) => {
    e.preventDefault();

    if (!validateForm()) {

      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/createEmployee", {
        name,
        email,
        mobile,
        designation,
        gender,
        courses,
        file
      });

      console.log(response.data);

 
      setName("");
      setEmail("");
      setMobile("");
      setDesignation("");
      setGender("");
      setCourses([]);
    } catch (error) {
      console.error("Error creating employee:", error.message);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
  
    localStorage.removeItem('adminName');
  
    navigate('/');
  };

  return (
    <div className="flex bg-black h-screen flex-col justify-center items-center">
      <div className="flex justify-between w-full p-4  bg-gray-800">
        <div className="text-3xl">Welcome </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={adminCreateEmployee}
        className="m-auto p-8 bg-gray-800 w-96 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-white ">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <span className="text-red-500">{error.name}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <span className="text-red-500">{error.email}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-white">
            Mobile NO
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <span className="text-red-500">{error.mobile}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block text-white">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          <span className="text-red-500">{error.designation}</span>
        </div>
        <div className="mb-4">
          <label className="block text-white">Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="male" className="text-white">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="female" className="text-white">
              Female
            </label>
          </div>
          <span className="text-red-500">{error.gender}</span>
        </div>
        <div className="mb-4">
  <label className="block text-white">Courses</label>
  <div>
    <input
      type="checkbox"
      id="mca"
      name="MCA"
      value="MCA"
      checked={courses.includes("MCA")}
      onChange={(e) => handleCheckboxChange(e)}
    />
    <label htmlFor="mca" className="text-white">
      MCA
    </label>
    <input
      type="checkbox"
      id="bca"
      name="BCA"
      value="BCA"
      checked={courses.includes("BCA")}
      onChange={(e) => handleCheckboxChange(e)}
    />
    <label htmlFor="bca" className="text-white">
      BCA
    </label>
    <input
      type="checkbox"
      id="bsc"
      name="BSC"
      value="BSC"
      checked={courses.includes("BSC")}
      onChange={(e) => handleCheckboxChange(e)}
    />
    <label htmlFor="bsc" className="text-white">
      BSC
    </label>
  </div>
  <span className="text-red-500">{error.courses}</span>
</div>
<div className="mb-4">
          <label htmlFor="mobile" className="block text-white">
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            value={mobile}
            onChange={(e) => handleFileChange(e)}
            className="w-full p-2 border rounded-md"
            required
          />
          <span className="text-red-500">{error.file}</span>
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded-md"
          type="submit"
        >
          Create Employee
        </button>
      </form>
      <Link className="text-white  bg-green-500 p-3" 
        to="/employeedata"

      >
        All Empployee
      </Link>
    </div>
  );
};

export default CreateEmployee;
