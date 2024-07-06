import { User } from "../models/user.model.js";
import { TeachersSubjects } from "../models/teachersSubjects.model.js";
import { validationResult } from "express-validator";

const addSubjects = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { subject, year } = req.body;
    const userID = req.params.id;
    const subjectID = req.params.subjectID;

    if (!subjectID || subjectID === "0") {
      // Create a new subject if subjectID is "0"
      const newSubject = await TeachersSubjects.create({
        subject,
        year,
        teacherID: userID,
      });
      const subId = newSubject.subject;
      return res.status(201).json({
        success: true,
        message: `${newSubject.subject} added successfully`,
        newSubject,
        subID: subId,
      });
    } else if (!userID) {
      // Update the subject if userID is null
      const updatedSubject = await TeachersSubjects.findOneAndUpdate(
        { _id: subjectID },
        { subject, year },
        { new: true }
      );

      if (updatedSubject) {
        return res.status(200).json({
          success: true,
          message: `${updatedSubject.subject} updated successfully`,
          updatedSubject,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Subject not found",
        });
      }
    } else {
      // Handle other cases where both subjectID and userID are provided
      const updatedSubject = await TeachersSubjects.findOneAndUpdate(
        { _id: subjectID },
        { subject, year },
        { new: true }
      );

      if (updatedSubject) {
        return res.status(200).json({
          success: true,
          message: `${updatedSubject.subject} updated successfully`,
          updatedSubject,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Subject not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubject = async (req, res) => {
  try {
    if (!req.params.teacherID) {
      return res.status(400).json({
        success: false,
        message: "Teacher ID is required",
      });
    }

    const subjects = await TeachersSubjects.find({
      teacherID: req.params.teacherID,
    }).exec();



    if (!subjects) {
      return res.status(201).json({
        success: true,
        message: "No subjects found for the given teacher ID",
      });
    }
    else
    {
      return res.status(200).json({
        success: true,
        message: "subjects found succesfully",
        subjects,
      });
    }
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSubject = async (req, res) => {
  const subject = await TeachersSubjects.findById(req.params.subjectID);
  try {
    if (!subject) {
      return (
        res.status(404),
        json({
          success: false,
          message: "subject not found",
        })
      );
    }

    await subject.deleteOne();
    return res.status(200).json({
      message: `${subject.subject} deleted successfully!`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllSubject = async (req, res) => {
  try {
    const subjects = await TeachersSubjects.find();
    return res.status(200).json({
      success: true,
      message: "subjects found succesfully",
      subjects: subjects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTeacherName = async (req,res) =>{
  try {
    const teacherName = await User.findById(req.params.teacherID);
    return res.status(200).json({
      success: true,
      message: "teacher found succesfully",
      teacher: teacherName.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { addSubjects, getSubject, deleteSubject, getAllSubject,getTeacherName };
