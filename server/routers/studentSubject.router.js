import express from "express";
import { body } from "express-validator";
import { getSpecificStudentData } from "../controllers/studentSubject.controller.js";

const studentSubjectRouter = express.Router();
studentSubjectRouter.route("/get/:year").get(getSpecificStudentData);
export { studentSubjectRouter };
