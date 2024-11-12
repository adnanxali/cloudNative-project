import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/employee/allEmployee');
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/employee/promote/${id}`);
      alert("Employee promoted to admin!");
      fetchEmployees(); 
    } catch (error) {
      console.error("Error promoting employee:", error);
      alert("Failed to promote employee.");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/employee/delete/${id}`);
      alert("Employee deleted successfully!");
      fetchEmployees(); 
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Set Roles</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{employee.name}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{employee.email}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {employee.isAdmin ? "Admin" : "Employee"}
                </td>
                <td className="py-3 px-6 text-center">
                  {!employee.isAdmin && (
                    <button
                      onClick={() => promoteToAdmin(employee._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Promote to Admin
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {! employee.isAdmin && (<button
                    onClick={() => deleteEmployee(employee._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
