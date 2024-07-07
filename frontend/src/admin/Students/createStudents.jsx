import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import makeAnimated from "react-select/animated";

const CreateStudents = () => {
  const [id, setID] = useState();
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [yearOptions, setYearOptions] = useState(null);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subjectArray, setSubjectArray] = useState([]);
  const [year, setYear] = useState("");
  const [studentArray, setStudentArray] = useState([]);
  const [editSubjectDisplay, setEditSubjectDisplay] = useState(false);
  const [refresher, setRefresher] = useState(false);

  const animatedComponents = makeAnimated();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const modifyName = (stdName) => {
    const nameParts = stdName.toLowerCase().split(" ");
    const modifiedName = nameParts
      .map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");

    setName(modifiedName);
  };

  const getSubjectsData = () => {
    axios
      .get("/api/v2/subject/get")
      .then((response) => {
        console.log(response.data.subjects)
        const subTempArray = []
        response.data.subjects.map((items)=>{
          subTempArray.push( { value: items.subject , label: items.subject  },)
           return subTempArray
        })
        setSubjectOptions(subTempArray)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudents = () => {
    axios
      .get("/api/v2/student/allstudents")
      .then((response) => {
        setStudentArray(response.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  
  const getYearData = () =>{
    axios
    .get("/api/v2/year/get")
    .then((response) => {
      // console.log(response.data.years)
      const yearTempArray = []
      response.data.years.map((items)=>{
         yearTempArray.push( { value: items.year , label: items.year  },)
         return yearTempArray
      })
      setYearOptions(yearTempArray)
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const getSubject = (e) => {
    const selectedSubjectData = e.map((items) => {
      const selectedSubject = items.value;
      return selectedSubject;
    });
    // console.log(selectedSubjectData)
    setSubjectArray(selectedSubjectData);
  };



  useEffect(() => {
    getYearData()
    getSubjectsData();
    getStudents();
  }, [refresher]);

  const setStudentsInformation = ([stdName, stdID, stdNO, stdYear]) => {
    setEditSubjectDisplay(true);
    setID(stdID);
    setName(stdName);
    setStudentID(stdNO);
    setYear(stdYear);
  };

  const editStudent = () => {
    axios
      .put(`/api/v2/student/edit-student/${id}`, {
        name,
        year,
        studentID,
      })
      .then((response) => {
        toast.success(response.data.message);
        setEditSubjectDisplay(false);
        setRefresher((refresher) => !refresher);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = (id) => {
    axios
      .delete(`/api/v2/student/delete-student/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        setEditSubjectDisplay(false);
        setRefresher((refresher) => !refresher);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSubjectsAndStudents = () => {
    console.log(year)
    axios
      .post("/api/v2/student/add", {
        subjectArray,
        year,
        name,
        studentID,
      })
      .then((response) => {
        toast.success(response.data.message);
        setRefresher(!refresher)
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

  return (
    <>
      {!editSubjectDisplay ? (
        <div className="w-[100%] mt-[4.5vw] max-lg:mt-[18vw] max-sm:mt-[11vh] ">
          <div className=" w-[100%] flex flex-col items-center justify-center gap-2 light">
            <div className=" border-t-[7px] w-[60%] bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add Students
              </h2>

              <form className="flex flex-col" onSubmit={submitHandler}>
                

                <input
                  type="number"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter student number"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                />
                <input
                  type="text"
                  className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter student name"
                  value={name}
                  onChange={(e) => modifyName(e.target.value)}
                />

                {/* ----------------------------------------------------------------------------------------- */}

                <div className="flex flex-col-reverse gap-[1.5vw] max-sm:gap-[2vh]">
                  <div className="w-[20%] max-sm:w-[100%]">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      options={yearOptions}
                      placeholder="Select Year"
                      onChange={(e) => setYear(e.value)}
                    />
                  </div>
                  <div className=" w-full">
                    <Select
                      isMulti
                      components={animatedComponents}
                      options={subjectOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Subject"
                      onChange={(e) => getSubject(e)}
                    />
                  </div>
                </div>

                {/* ------------------------------------------------------------------------------------------------- */}

                <button
                  id="pulsing-button"
                  type="submit"
                  className=" w-[20%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  onClick={addSubjectsAndStudents}
                >
                  Add
                </button>
              </form>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            <div className=" max-lg:w-full w-[60%] max-sm:w-[100%] text-gray-900  bg-gray-200 rounded-lg">
              <div className="p-4 flex ">
                <h1 className="text-3xl">Subjects</h1>
              </div>
              <div className="overflow-auto px-3 py-4 flex flex-col justify-center">
                <table className=" overflow-auto text-md bg-white shadow-md rounded mb-4">
                  <tbody className="overflow-auto">
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">#</th>
                      <th className="text-left p-3 px-5">name</th>
                      <th className="text-left p-3 px-5">year</th>
                      <th className="text-left p-3 px-5">student-id</th>
                      <th></th>
                    </tr>
                    {studentArray
                      ? studentArray.map((items, index) => {
                          return (
                            <tr
                              key={items._id}
                              className="border-b hover:bg-gray-200 "
                            >
                              <td className=" p-3 px-5">{index + 1}</td>
                              <td className=" p-3 px-5">{items.name}</td>
                              <td className=" p-3 px-5">{items.year}</td>
                              <td className=" p-3 px-5">{items.studentID}</td>
                              <td className="p-3 px-5 flex justify-end">
                                <button
                                  onClick={() =>
                                    setStudentsInformation([
                                      items.name,
                                      items._id,
                                      items.studentID,
                                      items.year,
                                    ])
                                  }
                                  type="button"
                                  className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                  <div className=" flex flex-row items-center justify-center gap-1">
                                    <FaEdit /> Edit
                                  </div>
                                </button>

                                <button
                                  onClick={() => deleteStudent(items._id)}
                                  type="button"
                                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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

                {/* </table> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" max-sm:mt-[10vh] max-lg:mt-[80px]   w-[100%] max-lg:w-[100%]  mt-[4.5vw]   flex flex-col flex-wrap items-center justify-center gap-[2vw]">
          <div class=" w-[100%]   rounded-lg flex flex-col items-center justify-center light">
            <div class="border-t-[7px] max-lg:w-[100%] w-[70%] max-sm:w-[100%]  bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Edit Student
              </h2>

              <form class=" flex flex-col" onSubmit={submitHandler}>
                <input
                  type="text"
                  class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter student-id"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                />
                <input
                  type="text"
                  class="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => modifyName(e.target.value)}
                />

                <div className="w-[20%] max-sm:w-[100%]">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={yearOptions}
                    placeholder="Select Year"
                    value={yearOptions.find((option) => option.value === year)}
                    onChange={handleYearChange}
                  />
                </div>

                <button
                  id="pulsing-button"
                  onClick={editStudent}
                  type="submit"
                  class="w-[10vw] max-sm:w-[25vw] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateStudents;
