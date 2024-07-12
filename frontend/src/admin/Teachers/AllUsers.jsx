import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Helpers from "../../config/Helpers";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [subjectArray, setSubjectArray] = useState([]);

  const getAllUsers = () => {
    axios
      .get("/api/v2/user/allusers", Helpers.authHeaders)
      .then((response) => {
        console.log(response);
        setUsers(response.data.users);
        setSubjectArray(response.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className=" w-[100%] flex items-center justify-center mt-[5vw] max-sm:mt-[10vh] max-lg:mt-[7vw] ">
      <div className=" shadow-xl shadow-gray-400  max-lg:w-full w-[60%] max-sm:w-[103%] text-gray-900 bg-gray-200 rounded-lg  ">
        <div className="p-4 flex">
          <h1 className="text-3xl">Teachers</h1>
        </div>
        <div className=" px-[10vh] py-3 flex flex-col justify-center items-center ">
          {users ? (
            users.map((user, userIndex) => (
              <div
                key={userIndex}
                className=" mb-3  shadow-lg  shadow-gray-400  max-sm:w-[87vw] max-lg:w-[125%] w-[100%] overflow-auto rounded-md "
              >
                <table className="w-full text-md bg-white shadow-lg  rounded-md ">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Name</th>
                      {/* <th className="text-left p-3 px-5">Email</th> */}
                      <th className="text-left p-3 px-5">Year</th>
                      <th className="text-left p-3 px-5">Subject</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-200">
                      <td className="w-[30%] p-3 px-5 align-top ">
                        {user.name}
                      </td>
                      {/* <td className="p-3 px-5 align-top break-words">
                        {user.email}
                      </td> */}
                      {subjectArray.length > 0 ? (
                        <td className="w-[25%] p-3 px-5 align-top">
                          {subjectArray
                            .filter((key) => user._id === key.teacherID)
                            .map((key, subjectIndex) => (
                              <div
                                key={subjectIndex}
                                className="border-b-2 last:border-b-0"
                              >
                                {key.year !== "" ? key.year : "-"}
                              </div>
                            ))}
                        </td>
                      ) : (
                        <div>no subjects found</div>
                      )}

                      <td className="w-[30%] p-3 px-5 align-top">
                        {subjectArray
                          .filter((key) => user._id === key.teacherID)
                          .map((key, subjectIndex) => (
                            <div
                              key={subjectIndex}
                              className="border-b-2 last:border-b-0"
                            >
                              {key.subject !== "" && key.subject !== null ? (
                                key.subject
                              ) : (
                                <div>-</div>
                              )}
                            </div>
                          ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
