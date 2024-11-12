import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/authentication", {
        username,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        
        localStorage.setItem("adminName", response.data.data.name);

        navigate('/welcome');
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500 text-white">
      <div className="text-2xl mb-4">Login Page</div>
      <form onSubmit={login} className="flex flex-col text-black bg-white p-8 rounded-lg shadow-md">
        <label className="mb-2">User Name</label>
        <input
          type="text"
          placeholder="Enter UserName"
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 mb-4 border rounded-md"
        />
        <label className="mb-2">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>

      <div className="mt-4">
       
      </div>
    </div>
  );
};

export default AdminLogin;
