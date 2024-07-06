import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [subjectArray, setSubjectArray] = useState([]);

  const getAllStudents = () => {
    axios
      .get("/api/v2/student/students-with-subjects")
      .then((response) => {
        console.log(response.data.students);

        setStudents(response.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <div className=" w-[100%] flex items-center justify-center mt-[5vw] max-sm:mt-[10vh] max-lg:mt-[7vw] ">
        <div className="border-gray-300 max-lg:w-full w-[80%] max-sm:w-[103%] text-gray-900 bg-gray-200 rounded-lg  ">
          <div className="p-4 flex">
            <h1 className="text-3xl">Students</h1>
          </div>
          <div className=" px-[10vh] py-3 flex flex-col justify-center items-center ">
            {students ? (
              students.map((student, userIndex) => (
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
                        <td className="p-3 px-5 align-top ">{student.name}</td>
                        <td className="p-3 px-5 align-top ">{student.year}</td>
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
              ))
            ) : (
              <p>No students found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllStudents;
