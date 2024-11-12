import React, { useState } from "react";
import ButtonDefault from "../componets/ButtonDefault";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [department,setDepartment]= useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  
  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/employee/register", {
        name:name,
        password:password,
        email:email,
        department:department
      });
      
      if(response.data.success){
        console.log("Registration successful:", response.data);
        navigate(`/employee/dashboard/${response.data.id}`);
      }
      else{
        setError("User Already Exist");
        console.log("Error",response.data.msg)
      }
    } catch (error) {
      if(error.response){
        setError(error.response.data.msg)
      }
      setError("Something went wrong");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="w-full bg-fit bg-center bg-no-repeat"
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Employee Registration
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter a Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ButtonDefault onClick={handleRegistration} title={"Sign Up"} />
                <p className="text-red-600">{error}</p>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="">
                    <span className="text-blue-900 font-semibold">Register</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
