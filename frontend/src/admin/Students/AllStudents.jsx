import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Helpers from "../../config/Helpers";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [subjectArray, setSubjectArray] = useState([]);

  const getAllStudents = () => {
    axios
      .get("/api/v2/student/students-with-subjects", Helpers.authHeaders)
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
        <div className="border-gray-300 max-lg:w-full w-[90%] max-sm:w-[103%] text-gray-900 bg-gray-200 rounded-lg  ">
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
                        <th className="text-left p-3 px-5">Teacher</th>
                        <th className="text-left p-3 px-5">Percentage</th>
                        <th className="text-left p-3 px-5">Effort</th>
                        <th className="text-left p-3 px-5">Attainment</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-200">
                        <td className="p-3 w-[10vw] px-5 align-top ">
                          {student.studentID}
                        </td>
                        <td className="p-3 px-5 w-[10vw]  align-top">
                          <div className="nameScroller  overflow-auto w-[10vw]">
                            {student.name}
                          </div>
                        </td>
                        <td className="p-3 px-5 w-[5vw] align-top ">
                          {student.year}
                        </td>
                        {student.subjects.length > 0 ? (
                          <td className="p-3 px-5 w-[20vw] align-top">
                            {student.subjects.map((key, subjectIndex) => (
                              <div
                                key={key._id}
                                className="border-b-2 last:border-b-0"
                              >
                                {key.subject}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <div className="p-3 px-5 w-[25vw] align-top ">
                            No Subjects Found
                          </div>
                        )}

                        {student.subjects && student.subjects.length > 0 ? (
                          <td className=" p-3 px-5 w-[25vw] align-top">
                            {student.subjects.map((subject, subjectIndex) => (
                              <div
                                key={subject._id || subjectIndex} // Using subjectIndex as a fallback key
                                className="scroller overflow-auto  border-b-2 last:border-b-0"
                              >
                                {subject.teacher != null &&
                                subject.teacher !== "" ? (
                                  subject.teacher
                                ) : (
                                  <div>-</div>
                                )}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <div className="p-3 px-5 w-[25vw] align-top">
                            No Subjects Found
                          </div>
                        )}

                        {student.subjects && student.subjects.length > 0 ? (
                          <td className="p-3 px-5 w-[10vw] align-top">
                            {student.subjects.map((subject, subjectIndex) => (
                              <div
                                key={subject._id || subjectIndex} // Using subjectIndex as a fallback key
                                className="border-b-2 last:border-b-0"
                              >
                                {subject.percentage != null &&
                                subject.percentage !== "" ? (
                                  subject.percentage
                                ) : (
                                  <div>-</div>
                                )}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <div className="p-3 px-5 w-[25vw] align-top">
                            No Subjects Found
                          </div>
                        )}

                        {student.subjects && student.subjects.length > 0 ? (
                          <td className="p-3 px-5 w-[10vw] align-top">
                            {student.subjects.map((subject, subjectIndex) => (
                              <div
                                key={subject._id || subjectIndex} // Using subjectIndex as a fallback key
                                className="border-b-2 last:border-b-0"
                              >
                                {subject.effort != null &&
                                subject.effort !== "" ? (
                                  subject.effort
                                ) : (
                                  <div>-</div>
                                )}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <div className="p-3 px-5 w-[10vw] align-top">
                            No Subjects Found
                          </div>
                        )}

                        {student.subjects && student.subjects.length > 0 ? (
                          <td className="p-3 px-5 w-[10vw] align-top">
                            {student.subjects.map((subject, subjectIndex) => (
                              <div
                                key={subject._id || subjectIndex} // Using subjectIndex as a fallback key
                                className="border-b-2 last:border-b-0"
                              >
                                {subject.attainment != null &&
                                subject.attainment !== "" ? (
                                  subject.attainment
                                ) : (
                                  <div>-</div>
                                )}
                              </div>
                            ))}
                          </td>
                        ) : (
                          <div className="p-3 px-5 w-[25vw] align-top">
                            No Subjects Found
                          </div>
                        )}
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
