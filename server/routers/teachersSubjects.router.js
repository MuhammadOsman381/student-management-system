import express from "express";
import {
  addSubjects,
  getSubject,
  deleteSubject,
  getAllSubject,
  getTeacherName
} from "../controllers/teacherSubject.controller.js";
const teacherSubjectRouter = express.Router();
import { body } from "express-validator";

//user routes
teacherSubjectRouter
  .route("/add/:id/edit/:subjectID")
  .post(
    [
      body("subject").notEmpty().withMessage("Subject is required"),
      body("year").notEmpty().withMessage("Year is required"),
    ],
    addSubjects
  );
teacherSubjectRouter.route("/delete/:subjectID").delete(deleteSubject);
teacherSubjectRouter.route("/get/:teacherID").get(getSubject);
teacherSubjectRouter.route("/get/teacher-name/:teacherID").get(getTeacherName);
teacherSubjectRouter.route("/allsubjects").get(getAllSubject);
export { teacherSubjectRouter };
