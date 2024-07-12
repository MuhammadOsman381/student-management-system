import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Helpers from "../config/Helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addData = async () => {
    try {
      const response = await axios.post(
        "/api/v2/user/login",
        { email, password },
        Helpers.authHeaders
      );
      toast.success(response.data.message);
      console.log(response.data.user.userType);
      Helpers.setItem("token", response.data.token, false);
      Helpers.setItem("user", response.data.user, true);
      if (response.data.user.userType === true) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/add-marks";
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.errors) {
        error.response.data.errors.map((items) => {
          toast.error(items.msg);
        });
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="flex h-screen w-screen items-center overflow-hidden px-2">
        <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
          <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-blue-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Sign up
            </h1>
            <p className="text-gray-500">create your own account</p>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="email"
                id="email"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                for="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                for="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
          </div>
          <div className="flex w-full items-center">
            <button
              onClick={addData}
              className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white"
            >
              Login
            </button>
          </div>
          {/* <p className="text-center text-gray-600">
            if you have an account?
            <a
              href="#"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
            >
              Sign in
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
