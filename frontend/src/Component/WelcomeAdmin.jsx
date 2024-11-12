import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const WelcomeAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('adminName');
  
    navigate('/');
  };


  const adminName = localStorage.getItem('adminName');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-500 mt-0 text-white">
      <div className="flex justify-between w-full p-4  bg-gray-800">
        <div className="text-3xl">Welcome </div>
        <p className='text-3xl'>{adminName}</p>
        <p className='text-3xl'><NavLink to='/employeedata'>Employee List</NavLink></p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl my-4">Dashboard</h1>
     

      <Link
        to="/create_employee"
        className="bg-blue-500 text-white py-2 px-4 rounded-md text-center"
      >
        Create Employee
      </Link>
    </div>
  );
};

export default WelcomeAdmin;
