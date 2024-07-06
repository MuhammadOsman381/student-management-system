import { validationResult } from "express-validator";
import { Year } from "../models/year.model.js";

const addYear = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { year } = req.body;
    const newYear = await Year.create({
      year,
    });

    if (newYear) {
      return res.status(200).json({
        success: true,
        message: `${newYear.year} added succesfully`,
        response_data: newYear,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "There is something error in adding year",
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

const getYear = async (req, res) => {
  try {
    const years = await Year.find();
    return res.status(200).json({
      success: true,
      message: "year found succesfully",
      years: years,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteYear = async (req, res) => {
  try {
    const deletedYear = await Year.findById(req.params.id);
    if (!deletedYear) {
      return res.status(404).json({
        success: false,
        message: "year not found",
      });
    }
    await deletedYear.deleteOne();
    return res.status(200).json({
      message: `${deletedYear.year} deleted successfully!`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is something wrong.",
    });
  }
};

const editYear = async (req, res) => {

    try {
        const { year } = req.body;
    
        // Ensure the required fields are present
        const updatedData = await Year.findByIdAndUpdate(
            req.params.id,
            { year },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "year not found",
            });
        }
    
        return res.status(200).json({
            success: true,
            message: `${updatedData.year} updated successfully`,
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

export { addYear, getYear, deleteYear, editYear };
