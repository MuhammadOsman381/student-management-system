import { validationResult } from "express-validator";
import { Subject } from "../models/subject.model.js";

const addSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { subject } = req.body;
    console.log(subject)
    const newSubject = await Subject.create({
      subject,
    });

    if (newSubject) {
      return res.status(200).json({
        success: true,
        message: `${newSubject.subject} added succesfully`,
        response_data: subject,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "There is something error in adding subject",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "There is something error",
      error: error,
    });
  }
};

const getSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();
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

const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findById(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    await deletedSubject.deleteOne();
    return res.status(200).json({
      message: `${deletedSubject.subject} deleted successfully!`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server issue",
    });
  }
};

const editSubject = async (req, res) => {

    try {
        const { subject } = req.body;
    
        // Ensure the required fields are present
        const updatedData = await Subject.findByIdAndUpdate(
            req.params.id,
            { subject },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
            });
        }
    
        return res.status(200).json({
            success: true,
            message: `${updatedData.subject} updated successfully`,
        });
    } catch (error) {
        console.error("Error updating subject:", error);
    
        // Check for specific error types and handle accordingly
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
    
    
};

export { addSubject, getSubject, deleteSubject, editSubject };
