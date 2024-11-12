import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditEmployee from './EditEmployee';

const EmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getEmployee');

        if (response.data && Array.isArray(response.data.employeeData)) {
          setEmployeeData(response.data.employeeData);
        } else {
          console.error('Error: Expected an array of employee data, but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (employee) => {
    setEditedEmployee(employee);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) => (employee._id === updatedEmployee._id ? updatedEmployee : employee))
    );
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:4000/deleteEmployee/${employeeId}`);
      const response = await axios.get('http://localhost:4000/getEmployee');
      if (response.data && Array.isArray(response.data.employeeData)) {
        setEmployeeData(response.data.employeeData);
      } else {
        console.error('Error: Expected an array of employee data, but received:', response.data);
      }
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl mb-4">Employee Data</h1>
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-600">
          Search Employee
        </label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button className="bg-green-500">
        <Link to="/create_employee">Create Employee</Link>
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.designation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.courses ? employee.courses.map((course, index) => <span key={index}>{course}</span>) : ''}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-yellow-500 text-white p-2 rounded-md mr-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <EditEmployee employee={editedEmployee} onUpdate={handleUpdateEmployee} onClose={handleCloseEditModal} />
        </div>
      )}
    </div>
  );
};

export default EmployeeData;
