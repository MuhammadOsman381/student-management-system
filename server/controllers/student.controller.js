import { validationResult } from "express-validator";
import { Student } from "../models/student.model.js";
import { TeachersSubjects } from "../models/teachersSubjects.model.js";
import { User } from "../models/user.model.js";
import { StudentsSubjects } from "../models/studentsSubjects.model.js";

export const addStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { subjectArray, year, name, studentID } = req.body;
  try {
    let isStudentExist = await Student.findOne({ studentID });
    let student;

    if (isStudentExist) {
      student = isStudentExist;
    } else {
      student = await Student.create({ year, name, studentID });
    }

    // Use Promise.all to handle asynchronous operations within map
    const createdSubjects = await Promise.all(
      subjectArray.map(async (subject) => {
        const createdSubject = await StudentsSubjects.create({
          subject,
          studentID: student._id,
        });
        student.subjects.push(createdSubject._id);
        return createdSubject;
      })
    );

    await student.save();

    return res.status(201).json({
      success: true,
      message: "Student and subjects are added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the student and subjects",
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().exec();

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Students found successfully",
        students: students,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving students",
    });
  }
};

export const getStudentsWithSubjects = async (req, res) => {
  try {
    const students = await Student.find().exec();

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }
    const results = [];
    for (const student of students) {
      const subjects = await StudentsSubjects.find({
        _id: { $in: student.subjects },
      }).exec();

      const studentWithSubjects = {
        _id: student._id,
        studentID: student.studentID,
        name: student.name,
        year: student.year,
        subjects: subjects,
      };
      results.push(studentWithSubjects);
    }

    return res.status(200).json({
      success: true,
      message: "Students and their subjects found successfully",
      students: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving students and their subjects",
    });
  }
};

export const editStudent = async (req, res) => {
  const { id } = req.params;
  const { studentID, name, year } = req.body;

  try {
    const editedStudent = await Student.findByIdAndUpdate(
      id,
      { name, year, studentID },
      { new: true, runValidators: true }
    );

    if (!editedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: editedStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the student",
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    } else {
      // Delete the subjects associated with the student
      await StudentsSubjects.deleteMany({ _id: { $in: student.subjects } });

      // Delete the student
      await student.deleteOne();

      return res.status(200).json({
        success: true,
        message: `${student.name} and their subjects have been deleted successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while deleting the student and their subjects",
    });
  }
};
