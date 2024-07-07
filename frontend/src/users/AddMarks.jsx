import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../admin/Loader";
import toast from "react-hot-toast";

const AddMarks = () => {
  const [percentage, setPercentage] = useState("");
  const [studentID, setStudentID] = useState("");
  const [effort, setEffort] = useState("");
  const [attainment, setAttainment] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [students, setStudents] = useState(null);
  const [loader, setLoader] = useState(false);

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [effortOptions, setEffortOptions] = useState();
  const [attainmentOptions, setAttainmentOptions] = useState();
  const [studentIdOptions, setStudentIdOptions] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  const settingEffortOptionsAndAttainment = () => {
    setAttainmentOptions([
      { value: "a", label: "a_Outstanding" },
      { value: "b", label: "b_Good" },
      { value: "c", label: "c_Satisfactory" },
      { value: "c", label: "d_Unsatisfactory" },
    ]);

    setEffortOptions([
      { value: "1", label: "1_Outstanding" },
      { value: "2", label: "2_Good" },
      { value: "3", label: "3_Satisfactory" },
      { value: "4", label: "4_Unsatisfactory" },
    ]);
  };

  const getSubjectsData = () => {
    axios
      .get("/api/v2/subject/get")
      .then((response) => {
        // console.log(response.data.subjects);
        const subTempArray = [];
        response.data.subjects.map((items) => {
          subTempArray.push({ value: items.subject, label: items.subject });
          return subTempArray;
        });
        setSubjectOptions(subTempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudentID = () => {
    axios
      .get("/api/v2/student/allstudents")
      .then((response) => {
        const idTempArray = [];
        response.data.students.map((items) => {
          idTempArray.push({ value: items.studentID, label: items.studentID });
          return idTempArray;
        });
        setStudentIdOptions(idTempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkvalues = () => {
    console.log(percentage, studentID, subject, effort, attainment);
  };

  const searchStudentByYear = () => {
    setLoader(true);
    axios
      .get(`/api/v2/student/subject/get/${year}`)
      .then((response) => {
        // toast.success(response.data.message)
        setStudents(response.data.students);
        setLoader(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setStudents(null)
        setLoader(false)
      });
  };

  useEffect(() => {
    getStudentID();
    getSubjectsData();
    settingEffortOptionsAndAttainment();
  }, []);

  return (
    <div>
      <div className="w-[100%] mt-[4.5vw] max-lg:mt-[18vw] max-sm:mt-[11vh] ">
        <div className=" w-[100%] flex flex-col items-center justify-center gap-2 light">
          <div className=" border-t-[7px] w-[60%] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Students
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="number"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Marks"
                required
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />

              {/* ----------------------------------------------------------------------------------------- */}

              <div className="flex flex-col gap-[1.5vw] max-sm:gap-[2vh]">
                <div className="w-full ">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={studentIdOptions}
                    placeholder="Select Student-ID"
                    onChange={(e) => setStudentID(e.value)}
                  />
                </div>
                <div className=" w-full">
                  <Select
                    options={subjectOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Subject"
                    onChange={(e) => setSubject(e.value)}
                  />
                </div>
                <div className=" w-full">
                  <Select
                    options={effortOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Effort Level"
                    onChange={(e) => setEffort(e.value)}
                  />
                </div>
                <div className=" w-full">
                  <Select
                    options={attainmentOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Attainment Level"
                    onChange={(e) => setAttainment(e.value)}
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------------------------------------------- */}

              <button
                id="pulsing-button"
                type="submit"
                className=" w-[20%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                onClick={checkvalues}
              >
                Add
              </button>
            </form>
          </div>
          {/* -------------------------------------------------------------------------------------- */}
          <div className="w-[60%] ">
            <form onSubmit={handleSubmit} class="max-w mx-auto">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 outline-none focus:ring-1 focus:outline-none focus:ring-blue-500 rounded-lg  dark:bg-gray-100 placeholder-gray-500 ring-blue-500 "
                  placeholder="Search students by class..."
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  onClick={searchStudentByYear}
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* --------------------------------------------------------------------------------------------------------------- */}

          {loader ? (
            <Loader />
          ) : (
            students && (
              <div className=" w-[100%] flex items-center justify-center mt-[1vw] max-sm:mt-[10vh] max-lg:mt-[7vw] ">
                <div className="border-gray-300 max-lg:w-full w-[80%] max-sm:w-[103%] text-gray-900 bg-gray-200 rounded-lg  ">
                  <div className="p-4 flex">
                    <h1 className="text-3xl">Students</h1>
                  </div>
                  <div className=" px-[10vh] py-3 flex flex-col justify-center items-center ">
                    {students.map((student, userIndex) => (
                      <div
                        key={userIndex}
                        className="mb-3  shadow-md  shadow-gray-400  max-sm:w-[87vw] max-lg:w-[125%] w-[100%] overflow-auto rounded-md "
                      >
                        <table className="w-full text-md bg-white shadow-lg  rounded-md ">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-3 px-5">Student-ID</th>
                              <th className="text-left p-3 px-5">Name</th>
                              <th className="text-left p-3 px-5">Year</th>
                              <th className="text-left p-3 px-5">Subjects</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b hover:bg-gray-200">
                              <td className="p-3 px-5 align-top ">
                                {student.studentID}
                              </td>
                              <td className="p-3 px-5 align-top ">
                                {student.name}
                              </td>
                              <td className="p-3 px-5 align-top ">
                                {student.year}
                              </td>
                              <td className="p-3 px-5 align-top">
                                {student.subjects.map((key, subjectIndex) => (
                                  <div
                                    key={key._id}
                                    className="border-b-2 last:border-b-0"
                                  >
                                    {key.subject}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMarks;
