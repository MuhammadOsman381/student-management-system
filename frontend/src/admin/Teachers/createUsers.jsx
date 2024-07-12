import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddTeachersSubject from "./addTeachersSubject";
import Helpers from "../../config/Helpers";

const CreateUsers = () => {
  const [teacherID, setTeacherID] = useState('');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [users, setUsers] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [addTeacherSubjectDisplay, setAddTeacherSubjectDisplay] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const modifyUserName = (subjectName) => {
    const nameParts = subjectName.toLowerCase().split(" ");
    const modifiedSubjectName = nameParts
      .map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");

    setName(modifiedSubjectName);
  };

  const addData = () => {
    console.log(name, email, password);
    axios
      .post(
        "/api/v2/user/register",
        {
          name,
          email,
          password,
        },
        Helpers.authHeaders
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          error.response.data.errors.map((items) => {
            toast.error(items.msg);
          });
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const getUsers = () => {
    axios
      .get("/api/v2/user/allusers",  Helpers.authHeaders)
      .then((response) => {
        setUsers(response.data.users);
        setRefresher((refresher) => !refresher);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/v2/user/delete/${id}`, {
        withCredentials: true,
      }, Helpers.authHeaders);
      if (response) {
        setRefresher((refresher) => !refresher);
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addSubjects = (userid) => {
    if (userid !== null && userid !== '') {
      setTeacherID(userid)
      setAddTeacherSubjectDisplay(true)
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {addTeacherSubjectDisplay  ? (
        <AddTeachersSubject userid={teacherID} />
      ) : (
        <div className=" max-sm:mt-[10vh] max-lg:mt-[80px]   w-[100%] max-lg:w-[100%]  mt-[4.5vw]   flex flex-col flex-wrap items-center justify-center gap-[2vw]">
          <div class=" w-[100%]   rounded-lg flex flex-col items-center justify-center light">
            <div class="border-t-[7px] max-lg:w-[100%] w-[60%] max-sm:w-[100%]  bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Add Teachers
              </h2>

              <form class=" flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="text"
                  class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => modifyUserName(e.target.value)}
                />
                <input
                  type="email"
                  class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  id="pulsing-button"
                  onClick={addData}
                  type="submit"
                  class="w-[10vw] max-sm:w-[25vw] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className=" w-[60%] max-lg:w-[100%] max-sm:w-[100%]">
            <div className="  text-gray-900  bg-gray-200 rounded-lg">
              <div className="p-4 flex ">
                <h1 className="text-3xl">Teachers</h1>
              </div>
              <div className="overflow-auto px-3 py-4 flex flex-col justify-center">
                <table className="overflow-auto w-full text-md bg-white shadow-md rounded mb-4">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">Email</th>
                    </tr>
                    {users && users.length > 0
                      ? users.map((user, index) => {
                        return (
                          <tr
                            key={index}
                            className="border hover:bg-gray-200 "
                          >
                            {user.userType ? (
                              <td className=" p-3 font-bold px-5">
                                {user.name} (Admin)
                              </td>
                            ) : (
                              <td className="p-3 px-5">{user.name} (User)</td>
                            )}
                            {user.userType ? (
                              <td className=" p-3 font-bold px-5">
                                {user.email} (Admin)
                              </td>
                            ) : (
                              <td className="p-3 px-5">
                                {user.email} (User)
                              </td>
                            )}

                            <td className="p-3 max-sm:w-auto max-sm:mt-2  px-5 flex justify-end">
                              <button
                                onClick={() => addSubjects(user._id)}
                                type="button"
                                className="mr-3 max-sm:w-[13vh] text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              >
                                <div className=" flex flex-row items-center justify-center gap-1">
                                  <FaAddressBook />
                                  Add Subject
                                </div>
                              </button>

                              <button
                                onClick={() => deleteUser(user._id)}
                                type="button"
                                className="text-sm  bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              >
                                <div className=" flex flex-row items-center justify-center gap-1">
                                  <MdDelete /> Delete
                                </div>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUsers;
