import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../admin/Loader";
import toast from "react-hot-toast";
import Helpers from "../config/Helpers";
import ViewStudents from "./viewStudents";

const AddMarks = () => {
  const [percentage, setPercentage] = useState("");
  const [studentID, setStudentID] = useState("");
  const [effort, setEffort] = useState("");
  const [attainment, setAttainment] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState([]);
  const [students, setStudents] = useState(null);
  const [loader, setLoader] = useState(false);
  const [refresher,setRefresher] = useState(false);

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [effortOptions, setEffortOptions] = useState();
  const [attainmentOptions, setAttainmentOptions] = useState();
  const [studentIdOptions, setStudentIdOptions] = useState();
  const [yearOptions,setYearOptions] = useState([])


  function handleSubmit(e) {
    e.preventDefault();
  }

  const settingEffortOptionsAndAttainment = () => {
    setAttainmentOptions([
      { value: "a", label: "a-Outstanding" },
      { value: "b", label: "b-Good" },
      { value: "c", label: "c-Satisfactory" },
      { value: "c", label: "d-Unsatisfactory" },
    ]);

    setEffortOptions([
      { value: "1", label: "1-Outstanding" },
      { value: "2", label: "2-Good" },
      { value: "3", label: "3-Satisfactory" },
      { value: "4", label: "4-Unsatisfactory" },
    ]);
  };

  const getSubjectsData = () => {
    axios
      .get("/api/v2/subject/get",Helpers.authHeaders)
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
      .get("/api/v2/student/allstudents",Helpers.authHeaders)
      .then((response) => {
        const idTempArray = [];
        response.data.students.map((items) => {
          idTempArray.push({ value: items.studentID, label:`${items.studentID}-${items.name}` });
          return idTempArray;
        });
        setStudentIdOptions(idTempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createReport = () => {
    // console.log(percentage, studentID, subject, effort, attainment);

    axios
      .post("/api/v2/report/add",{
        percentage,
        studentID,
        subject,
        effort,
        attainment,
        year
      },Helpers.authHeaders)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
      setRefresher((refresher)=>(!refresher))
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  const searchStudentByYear = () => {
    setLoader(true)
    z()
  };

  const z = () =>{
   if(year !== null && year !== '' )
  {
    axios
    .get(`/api/v2/student/subject/get/${year}`, Helpers.authHeaders)
    .then((response) => {
      console.log(response)
      setStudents(response.data.students);
      setLoader(false);
    })
    .catch((error) => {
      console.log(error)
      toast.error(error.response.data.message);
      setStudents(null);
      setLoader(false);
    });
  }
  }

  const getYearData = () => {
    axios
      .get("/api/v2/year/get", Helpers.authHeaders)
      .then((response) => {
        const yearTempArray = [];
        response.data.years.map((items) => {
          yearTempArray.push({ value: items.year, label: items.year });
          return yearTempArray;
        });
        setYearOptions(yearTempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudentID();
    getSubjectsData();
    settingEffortOptionsAndAttainment();
    getYearData()
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
           

              {/* ----------------------------------------------------------------------------------------- */}

              <div className="flex flex-col gap-[1.5vw] max-sm:gap-[2vh]">
                <div className="w-full ">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={studentIdOptions}
                    placeholder="Select Student-ID/Name"
                    onChange={(e) => setStudentID(e.value)}
                  />
                </div>
                <div className=" w-full">
                  <Select
                    options={yearOptions}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select Year"
                    onChange={(e) => setYear(e.value)}
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
                <input
                type="number"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-0 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Enter Marks"
                required
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
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
                onClick={createReport}
              >
                Add
              </button>
            </form>
          </div>
          {/* -------------------------------------------------------------------------------------- */}
          {/* --------------------------------------------------------------------------------------------------------------- */}

           <ViewStudents refreshed={refresher}  year={year} subject={subject} />
        </div>
      </div>
    </div>
  );
};

export default AddMarks;
