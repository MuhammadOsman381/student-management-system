import React, { useEffect, useState } from "react";
import AdminSideBar from "./adminLayout";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState("");
  const [students,setStudents] = useState('');

  const getAllUsers = () => {
    axios
      .get("/api/v2/user/allusers")
      .then((response) => {
        setUsers(response.data.users.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudents = () =>
{
  axios
  axios
  .get("/api/v2/student/allstudents")
  .then((response) => {
    setStudents(response.data.students.length);
  })
  .catch((error) => {
    console.log(error);
  });
}

  useEffect(() => {
    getAllUsers();
    getStudents()
  }, []);

  return (
    <div className="bg-white h-screen w-full  flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl ">
          Statistics
        </h2>
        <div className="flex flex-wrap items-center justify-center max-sm:flex-col gap-7 mt-4">
          <div className="border-t-[4px] w-[15vw] max-sm:w-[20vh] overflow-hidden shadow-xl shadow-gray-400 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                  Total Users
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {users}
                </dd>
              </dl>
            </div>
          </div>

          <div className=" border-t-[4px] w-[15vw] max-sm:w-[20vh] overflow-hidden  shadow-xl shadow-gray-400 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500  dark:text-gray-400">
                  Total Students
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">
                  {students}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
