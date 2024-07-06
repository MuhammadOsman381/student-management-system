import express from "express";
import { isAuthentication } from "../middleware/authentication.js";
import {
  register,
  login,
  logout,
  getUsers,
  deleteUser,
  editUser,
} from "../controllers/user.controller.js";
import { body } from "express-validator";

const userRouter = express.Router();

//user routes
userRouter.post(
  "/register",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("Email Address is required"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ],
  register
);
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email Address is required"),
    body("password").isLength({ min: 4 }).withMessage("Password is required"),
  ],
  login
);
userRouter
  .route("/update/:id")
  .put(
    [
      body("email").isEmail().withMessage("Invalid email address"),
      body("password").isLength({ min: 4 }).withMessage("Invalid password"),
    ],
    editUser
  );
userRouter.post("/logout", isAuthentication, logout);
userRouter.get("/allusers", getUsers);
userRouter.route("/delete/:id").delete(deleteUser);

export { userRouter };
