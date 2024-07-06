import express from "express";
import { body } from "express-validator";
import { addStudent, deleteStudent, editStudent, getAllStudents, getStudentsWithSubjects } from "../controllers/student.controller.js";

const studentRoute = express.Router();
//user routes
studentRoute
  .post(
    '/add'
    ,
    [
      body("studentID").notEmpty().withMessage("Student-ID is required"),
      body("name").notEmpty().withMessage("Name is required"),
      body("subjectArray").notEmpty().withMessage("Subject is required"),
      body("year").notEmpty().withMessage("Year is required"),
    ],
    addStudent
  );
studentRoute.route("/allstudents").get(getAllStudents);
studentRoute.route("/students-with-subjects").get(getStudentsWithSubjects);
studentRoute.route("/edit-student/:id").put(editStudent);
studentRoute.route("/delete-student/:id").delete(deleteStudent);

export { studentRoute };
