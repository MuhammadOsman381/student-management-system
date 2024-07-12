import express from "express";
import { body } from "express-validator";
import { createReport, getStudentsWithYearAndSubjects } from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.post("/add", [
  body("percentage").notEmpty().withMessage("Percentage is required"),
  body("studentID").notEmpty().withMessage("Student-ID is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("effort").notEmpty().withMessage("Effort level must not be empty"),
  body("attainment").notEmpty().withMessage("Attainment level must not be empty"),
  createReport
]);
reportRouter.post('/get/students-with-year-and-subjects',getStudentsWithYearAndSubjects)

export { reportRouter };
