import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Helpers from "../config/Helpers";

const Subjects = () => {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [yearArray, setYearArray] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [editRecognizer, setEditRecognizer] = useState(false);
  const [id, setID] = useState("");
  const [loader, setLoader] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const modifySubjectName = (subjectName) => {
    const nameParts = subjectName.toLowerCase().split(" ");
    const modifiedSubjectName = nameParts
      .map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(" ");

    setSubject(modifiedSubjectName);
  };

  const editSubject = ([subid, subName]) => {
    setEditRecognizer(true);
    setSubject(subName);
    setID(subid);
  };

  const addSubject = () => {
    setLoader(true);
    console.log(editRecognizer)
    if (editRecognizer) {
      axios
        .put(`/api/v2/subject/edit/${id}`, {
          subject,
        }, Helpers.authHeaders)
        .then(function (response) {
          toast.success(response.data.message);
          setEditRecognizer(false);
          setSubject("");
          setRefresher((refresher) => !refresher);
          setLoader(false);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.errors) {
              error.response.data.errors.forEach((item) => {
                toast.error(item.msg);
              });
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            console.error("Error:", error.message);
            setLoader(false);
            toast.error("An unexpected error occurred.");
          }
        });
    } else {
      console.log(subject)
      axios
        .post(
          "/api/v2/subject/add",
          {
            subject,
          },
          Helpers.authHeaders
        )
        .then(function (response) {
          console.log(response)
            toast.success(response.data.message);
            setSubject("");
          setRefresher((refresher) => !refresher);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.data.errors) {
            error.response.data.errors.map((items) => {
              toast.error(items.msg);
              setLoader(false);
            });
          } else {
            toast.error(error.response.data.message);
            setLoader(false);
          }
        });
    }
  };

  const deleteSubject = async (id) => {
    setLoader(true);
    try {
      const response = await axios.delete(`/api/v2/subject/delete/${id}`, Helpers.authHeaders);
      if (response) {
        setLoader(false);
      }
      toast.success(response.data.message);
      setRefresher((refresher) => !refresher);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        setLoader(false);
      } else {
        toast.error("An error occurred while deleting the subject.");
        setLoader(false);
      }
    }
  };




  const editYear = ([yearid, yearName]) => {
    setEditRecognizer(true);
    setYear(yearName);
    setID(yearid);
  };

  const addYear = () => {
    setLoader(true);
    console.log(editRecognizer)
    if (editRecognizer) {
      axios
        .put(`/api/v2/year/edit/${id}`, {
          year,
        }, Helpers.authHeaders)
        .then(function (response) {
          toast.success(response.data.message);
          setEditRecognizer(false);
          setYear("");
          setRefresher((refresher) => !refresher);
          setLoader(false);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.errors) {
              error.response.data.errors.forEach((item) => {
                toast.error(item.msg);
              });
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            console.error("Error:", error.message);
            setLoader(false);
            toast.error("An unexpected error occurred.");
          }
        });
    } else {
      console.log(subject)
      axios
        .post(
          "/api/v2/year/add",
          {
            year,
          },
          Helpers.authHeaders
        )
        .then(function (response) {
          console.log(response)
            toast.success(response.data.message);
          setYear("");
          setRefresher((refresher) => !refresher);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error)
          if (error.response.data.errors) {
            error.response.data.errors.map((items) => {
              toast.error(items.msg);
              setLoader(false);
            });
          } else {
            toast.error(error.response.data.message);
            setLoader(false);
          }
        });
    }
  };

  const deleteYear = async (id) => {
    console.log(id)
    setLoader(true);
    try {
      const response = await axios.delete(`/api/v2/year/delete/${id}`, Helpers.authHeaders);
      console.log(response)
      if (response) {
        setLoader(false);
      }
      toast.success(response.data.message);
      setRefresher((refresher) => !refresher);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        setLoader(false);
      } else {
        toast.error("An error occurred while deleting the subject.");
        setLoader(false);
      }
    }
  };


  const getSubjects = () => {
   try {
    axios
    .get(`/api/v2/subject/get`, Helpers.authHeaders)
    .then((response) => {
      setSubjectArray(response.data.subjects)      
    })
    .catch((error) => {
      toast.error(error.response);
    });
   } catch (error) {
    console.log(error)
    
   }
  };


  const getYear = () => {
   try {
    axios
    .get(`/api/v2/year/get`, Helpers.authHeaders)
    .then((response) => {
      setYearArray(response.data.years)
    })
    .catch((error) => {
      toast.error(error.response);
    });
   } catch (error) {
    console.log(error)
   }
  };


  useEffect(() => {
    getSubjects();
    getYear();
  }, [refresher]);
  return (
    <div className=" mt-[4.5vw] max-sm:mt-[9vh] max-lg:w-[100%] max-lg:mt-[8vw] max-sm:w-[100%]  h-auto flex flex-col flex-wrap items-center  gap-[2vw]">
      <div className="  w-[50%] max-lg:w-[100%]  flex flex-col items-center justify-center light">
        <div className="border-t-[7px]  w-[100%]  bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Subjects
            </h2>          
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
      
              <input
                type="text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => modifySubjectName(e.target.value)}
              />
          
              <button
                id="pulsing-button"
                onClick={() => addSubject()}
                type="submit"
                className="w-[20%] max-sm:w-[30%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Add 
              </button>
  
          </form>
        </div>
      </div>

      <div className="  w-[50%] max-lg:w-[100%]  flex flex-col items-center justify-center light">
        <div className="border-t-[7px]  w-[100%]  bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Year
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
      
              <input
                type="text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
         
              <button
                id="pulsing-button"
                onClick={() => addYear()}
                type="submit"
                className="w-[20%] max-sm:w-[30%] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Add 
              </button>

          </form>
        </div>
      </div>


      <div className="border  max-lg:w-[100%] max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center  w-[50%] max-sm:w-[100%] text-gray-900  bg-gray-200 rounded-lg">
        <div className="p-4 flex max-sm:w-full ">
          <h1 className="text-3xl">Subjects</h1>
        </div>
        <div className=" overflow-auto  max-sm:w-[87vw] max-sm:h-auto px-3 py-4 flex flex-col justify-center">
          <table className=" text-md  bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">#</th>
                <th className="text-left p-3 px-5">Subject</th>
                {/* <th className="text-left p-3 px-5">Year</th> */}
                <th></th>
              </tr>
              {subjectArray.length !== 0 ? (
                subjectArray.map((items, index) => {
                  return (
                    <tr key={items} className="border-b hover:bg-gray-200 ">
                      <td className=" p-3 px-5">{index + 1}</td>
                      <td className=" p-3 px-5">{items.subject}</td>
                      {/* <td className=" p-3 px-5">{items.year}</td> */}
                      <td className="p-3 px-5 flex justify-end">
                        <button
                          onClick={() =>
                            editSubject([items._id, items.subject])
                          }
                          type="button"
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          <div className=" flex flex-row items-center justify-center gap-1">
                            Edit
                            <FaEdit />
                          </div>
                        </button>

                        <button
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
                })
              ) : (
                <tr className="border-b hover:bg-gray-200 ">
                  <td className=" p-3 px-5">null</td>
                  <td className=" p-3 px-5">null</td>

                  {/* <td className=" p-3 px-5">null</td> */}
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      // onClick={() => addSubjects(user._id)}
                      type="button"
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      null
                    </button>

                    <button
                      // onClick={() => deleteUser(user._id)}
                      type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      null
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* </table> */}
        </div>
      </div>

      <div className="border  max-lg:w-[100%] max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center  w-[50%] max-sm:w-[100%] text-gray-900  bg-gray-200 rounded-lg">
        <div className="p-4 flex max-sm:w-full ">
          <h1 className="text-3xl">Year</h1>
        </div>
        <div className=" overflow-auto  max-sm:w-[87vw] max-sm:h-auto px-3 py-4 flex flex-col justify-center">
          <table className=" text-md  bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">#</th>
                {/* <th className="text-left p-3 px-5">Subject</th> */}
                <th className="text-left p-3 px-5">Year</th>
                <th></th>
              </tr>
              {yearArray.length !== 0 ? (
                yearArray.map((items, index) => {
                  return (
                    <tr key={items} className="border-b hover:bg-gray-200 ">
                      <td className=" p-3 px-5">{index + 1}</td>
                      {/* <td className=" p-3 px-5">{items.subject}</td> */}
                      <td className=" p-3 px-5">{items.year}</td>
                      <td className="p-3 px-5 flex justify-end">
                        <button
                          onClick={() =>
                            editYear([items._id, items.year])
                          }
                          type="button"
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          <div className=" flex flex-row items-center justify-center gap-1">
                            Edit
                            <FaEdit />
                          </div>
                        </button>

                        <button
                          onClick={() => deleteYear(items._id)}
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
              ) : (
                <tr className="border-b hover:bg-gray-200 ">
                  <td className=" p-3 px-5">null</td>
                  <td className=" p-3 px-5">null</td>

                  {/* <td className=" p-3 px-5">null</td> */}
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      // onClick={() => addSubjects(user._id)}
                      type="button"
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      null
                    </button>

                    <button
                      // onClick={() => deleteUser(user._id)}
                      type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      null
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* </table> */}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
