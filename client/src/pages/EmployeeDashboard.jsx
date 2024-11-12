import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDashboard() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/employee/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <div className="text-center text-gray-500 mt-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {employee.name}
        </h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Email: </span> {employee.email}
          <br />
          <span className="font-medium">Department: </span> {employee.department}
        </p>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
