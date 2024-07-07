import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loader from "../Loader";

const AddTeachersSubject = ({ userid }) => {
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [teacherSubArray, setTeacherSubArray] = useState(null);
  const [subjectID, setSubjectID] = useState(0);
  const [refresher, setRefresher] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [arrayChecker, setArrayChecker] = useState(false);

  const animatedComponents = makeAnimated();

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const handleSubjectChange = (selectedOption) => {
    setSubject(selectedOption.value);
  };

  const getTeacherSubjects = async () => {
    const teacherID = localStorage.getItem("userid");
    console.log(teacherID);
    try {
      axios
        .get(`/api/v2/teacher/subject/get/${teacherID}`, {
          withCredentials: true,
        })
        .then((response) => {
          setTeacherSubArray(response.data.subjects);
          setArrayChecker(true);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(response.data.subjects); // Verify fetched data
    } catch (error) {
      // toast.error(error.response.data.message); // Assuming error.response.data.message contains the error message
    }
  };

  useEffect(() => {
    getTeacherSubjects();
    localStorage.setItem("userid", userid);
  }, [refresher]);

  const getSubjects = () => {
    axios
      .get("/api/v2/subject/get")
      .then((response) => {
        const subArray = [];
        response.data.subjects.forEach((item) => {
          subArray.push({ value: item.subject, label: item.subject });
        });
        setSubjectOptions(subArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYear = () => {
    axios
      .get("/api/v2/year/get")
      .then((response) => {
        const yearArray = [];
        response.data.years.forEach((item) => {
          yearArray.push({ value: item.year, label: item.year });
        });
        setYearOptions(yearArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editSubject = ([subID, subName, stdYear]) => {
    console.log(subID, subName, stdYear);
    if (subID !== 0) {
      setSubjectID(subID);
    } else {
      setSubjectID(0);
    }
    setYear(stdYear);
    setSubject(subName);
  };

  const getTeacherName = () => {
    const teacherID = userid;
    axios
      .get(`/api/v2/teacher/subject/get/teacher-name/${teacherID}`)
      .then((response) => {
        setTeacherName(response.data.teacher);
        setTeacherSubArray(response.data.subjects);
      })
      .catch((error) => {
        toast.error(error.response);
      });
  };

  const addSubject = () => {
    console.log(subject, year);

    const id = userid;
    axios
      .post(
        `/api/v2/teacher/subject/add/${id}/edit/${subjectID}`,
        {
          subject,
          year,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        toast.success(response.data.message);
        // setSubject("");
        // setYear("");
        setRefresher((refresher) => !refresher);
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          error.response.data.errors.map((items) => {
            toast.error(items.msg);
          });
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const deleteSubject = async (subjectID) => {
    try {
      const response = await axios.delete(
        `/api/v2/teacher/subject/delete/${subjectID}`
      );
      toast.success(response.data.message);
      setRefresher(!refresher);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the subject.");
      }
    }
  };

  useEffect(() => {
    getTeacherName();
    getSubjects();
    getYear();
  }, [refresher]);

  return (
    <div className=" mt-[4.5vw] max-lg:mt-[6vh] max-sm:mt-[10vh] h-auto flex flex-col flex-wrap items-center  gap-[2vw]">
      <div className="   w-[40%] max-lg:w-[70%] max-sm:w-[100%]   flex flex-col items-center justify-center light">
        <div className="border-t-[7px]  w-[100%] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add {teacherName}'s Subjects
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col-reverse gap-[1.5vw] max-sm:gap-[2vh]">
              <div className="w-full max-sm:w-full">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={yearOptions}
                  placeholder="Select Year"
                  value={yearOptions.find((option) => option.value === year)}
                  onChange={handleYearChange}
                />
              </div>
              <div className=" w-full">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  components={animatedComponents}
                  placeholder="Select Subject"
                  options={subjectOptions}
                  value={subjectOptions.find(
                    (option) => option.value === subject
                  )}
                  onChange={handleSubjectChange}
                />
              </div>
            </div>
            <button
              onClick={() => addSubject()}
              type="submit"
              className="w-[20%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {(teacherSubArray) && (
        <div className=" max-lg:w-full w-[70%] max-sm:w-[100%] text-gray-900  bg-gray-200 rounded-lg">
          <div className="p-4 flex ">
            <h1 className="text-3xl">Subjects</h1>
          </div>
          <div className="overflow-auto px-3 py-4 flex flex-col justify-center">
            <table className=" overflow-auto text-md bg-white shadow-md rounded mb-4">
              <tbody className="overflow-auto">
                <tr className="border-b">
                  <th className="text-left p-3 px-5">#</th>
                  <th className="text-left p-3 px-5">Year</th>
                  <th className="text-left p-3 px-5">Subject</th>
                </tr>
                {teacherSubArray.map((items, index) => {
                  console.log(items.year)
                  return (
                    <tr key={items._id} className="border-b hover:bg-gray-200 ">
                      <td className=" p-3 px-5">{index + 1}</td>
                      <td className=" p-3 px-5">{items.year}</td>

                      <td className=" p-3 px-5">{items.subject}</td>
                      <td className="p-3 px-5 flex justify-end">
                        <button
                          onClick={() =>
                            editSubject([items._id, items.subject, items.year])
                          }
                          type="button"
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          <div className=" flex flex-row items-center justify-center gap-1">
                            <FaEdit /> Edit
                          </div>
                        </button>

                        <button
                          onSubmit={handleSubmit}
                          onClick={() => deleteSubject(items._id)}
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
                })}
              </tbody>
            </table>

            {/* </table> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeachersSubject;
