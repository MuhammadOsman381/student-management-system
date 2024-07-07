import express from "express";
import { body } from "express-validator";
import { getSpecificStudentData } from "../controllers/studentSubject.controller.js";

const studentSubjectRouter = express.Router();


studentSubjectRouter.route("/get/:year").get(getSpecificStudentData);
//   studentSubjectRouter.route("/delete/:subjectID").delete(deleteSubject);
//   studentSubjectRouter.route("/get/:teacherID").get(getSubject);
//   studentSubjectRouter.route("/get/teacher-name/:teacherID").get(getTeacherName);
//   studentSubjectRouter.route("/allsubjects").get(getAllSubject);
export { studentSubjectRouter };
