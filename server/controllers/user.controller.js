import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/features.js";
import { validationResult } from "express-validator";
import { Subject } from "../models/subject.model.js";
import { TeachersSubjects } from "../models/teachersSubjects.model.js";

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "invalid email",
      });
    }

    const decryptedPassword = await bcrypt.compare(password, user.password);
    if (!decryptedPassword) {
      return res.status(404).json({
        success: false,
        message: "invalid password",
      });
    }
    createToken(user, res, `Welcome ${user.name}`, 200);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const allSubjects = await Subject.find();
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    // Create new user
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      subjects: allSubjects._id,
      userType: false,
    });
    await newUser.save();
    // Generate token and send response
    createToken(newUser, res, `${newUser.name} registered successfully`, 201);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
      message: "logged out successfully",
    });
};

const getUsers = async (req, res) => {
  try {
    const allsubjects = await TeachersSubjects.find();
    const allUsers = await User.find();
    if (!allUsers || !allsubjects) {
      res.status(404).json({
        success: false,
        message: "users and subjects are not found",
        users: allUsers,
        subjects: allsubjects,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "users and subjects found succesfully",
        users: allUsers,
        subjects: allsubjects,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server issue",
    });
  }
};

const deleteUser = async (req, res) => {
  const users = await User.findById(req.params.id);
  try {
    if (!users) {
      return (
        res.status(404),
        json({
          success: false,
          message: "user not found",
        })
      );
    }

    await users.deleteOne();
    return res.status(200).json({
      message: "user deleted successfully!",
      success: true,
      user: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server issue",
    });
  }
};

async function editUser(req, res) {
  try {
    const { name, email } = req.body;
    console.log(title, content);
    const updatedData = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return (
        res.status(404),
        json({
          success: false,
          message: "user not found",
        })
      );
    }

    return res.status(201).json({
      success: true,
      message: "users data updated successfully",
    });
  } catch (error) {
    console.error("Error adding station:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export { register };
export { login };
export { logout };
export { getUsers };
export { deleteUser };
export { editUser };
