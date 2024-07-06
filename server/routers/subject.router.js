import express from "express";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import {
  addSubject,
  editSubject,
  getSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

const subjectRouter = express.Router();

subjectRouter.post(
  "/add",
  [
    body("subject").notEmpty().withMessage("subject is required"),
  ],
  addSubject
);
subjectRouter.get("/get", getSubject);
subjectRouter.route("/delete/:id").delete(deleteSubject);
subjectRouter.route("/edit/:id").put(editSubject);
export { subjectRouter };
