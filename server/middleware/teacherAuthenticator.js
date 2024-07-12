import { TeachersSubjects } from "../models/teachersSubjects.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { teacherSubjectRouter } from "../routers/teachersSubjects.router.js";

const teacherAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const { year, subject } = req.body;

    console.log(year,subject)

    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await TeachersSubjects.findOne({
      teacherID: decodedToken._id,
      year: year,
      subject: subject,
    });

    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized user" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login first",
    });
  }
};

export { teacherAuth };

// import mongoose from "mongoose";

// const teacherSubjectSchema = new mongoose.Schema({
//   subject: {
//     type: String,
//     required: true,
//   },
//   year: {
//     type: String,
//   },
//   teacherID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// export const TeachersSubjects = mongoose.model("TeachersSubjects", teacherSubjectSchema);
