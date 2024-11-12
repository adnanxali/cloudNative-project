import React, { useState } from "react";
import ButtonDefault from "../componets/ButtonDefault";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
  const [email,setEmail]= useState("");
  const [pass,setPass]= useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();

  // Handle form submission
  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/admin/login", {
        email,
        password:pass,
      });
      if (response.data.success) {
        console.log("Sign-in successful:", response.data);
        navigate(`/admin/dashboard/${response.data.id}`)
        
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      if(error.response){
        setError(error.response.data.msg);
      }
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-10 lg:px-0">
      <div className="max-w-screen-sm bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:px-4 sm:py-10">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Admin Login
              </h1>
              <p className="text-[12px] text-gray-500">
                Enter Your Account Details to Sign In
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter your Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <ButtonDefault title={"Login"} onClick={handleSignin} />
                <p className="text-red-600">{error}</p>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Forgot Your Password?{" "}
                  <a href="">
                    <span className="text-blue-900 font-semibold">Forgot</span>
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

export default AdminLogin;
