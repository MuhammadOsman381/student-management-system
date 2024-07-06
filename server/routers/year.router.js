import express from "express";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import { addYear, deleteYear, editYear, getYear } from "../controllers/year.controller.js";


const yearRouter = express.Router();

yearRouter.post(
  "/add",
  [
    body("year").notEmpty().withMessage("year is required"),
  ],
  addYear
);
yearRouter.get("/get", getYear);
yearRouter.route("/delete/:id").delete(deleteYear);
yearRouter.route("/edit/:id").put(editYear);

export { yearRouter };
