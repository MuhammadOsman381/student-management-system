import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import Helpers from "../config/Helpers";
import toast from "react-hot-toast";

const ViewStudents = ({ year, subject, refreshed }) => {
  const [students, setStudents] = useState([]);
  const search = () => {
    axios
      .post(
        "/api/v2/report/get/students-with-year-and-subjects",
        {
          year,
          subject,
        },
        Helpers.authHeaders
      )
      .then((response) => {
        console.log(response);
        setStudents(response.data.students);
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    search();
  }, [refreshed]);

  return (
    <>
      <div className=" max-sm:mt-[10vh] max-lg:mt-[80px]   w-[100%] max-lg:w-[100%]  mt-[2vw]   flex flex-col flex-wrap items-center justify-center gap-[2vw]">
        <div className=" w-[80%] max-lg:w-[100%] max-sm:w-[100%]">
          <div className="  text-gray-900  bg-gray-200 rounded-lg">
            <div className="p-4 flex ">
              <h1 className="text-3xl">Students</h1>
            </div>
            <div className="scroller overflow-auto px-3 py-4 flex flex-col justify-center">
              <table className="overflow-auto w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                  <tr className="border-b">
                    <th className="text-left p-3 px-5">Student-ID</th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Subject</th>
                    <th className="text-left p-3 px-5">Teacher</th>
                    <th className="text-left p-3 px-5">Percentage</th>
                    <th className="text-left p-3 px-5">Effort</th>
                    <th className="text-left p-3 px-5">Attainment</th>
                  </tr>
                  {students?.length > 0
                    ? students.map((key, index) => {
                        return (
                          <tr key={index} className="border hover:bg-gray-200 ">
                            <td className="p-3 px-5">{key.studentID}</td>

                            <td className=" p-3  px-5">{key.name}</td>

                            <td className="p-3 px-5">{key.subject}</td>

                            <td className="p-3 px-5">{key.teacher} --</td>

                            <td className="p-3 px-5">{key.percentage}</td>

                            <td className="p-3 px-5">{key.effort}</td>

                            <td className="p-3 px-5">{key.attainment}</td>

                            <td className=" w-auto p-3 max-sm:w-auto max-sm:mt-2  mr-4 flex ">
                              <button
                                // onClick={() => deleteUser(user._id)}
                                type="button"
                                className="text-sm  bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              >
                                <div className=" flex flex-row items-center justify-center gap-1">
                                  Edit
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
    </>
  );
};

export default ViewStudents;
