import { validationResult } from "express-validator";
import { StudentsSubjects } from "../models/studentsSubjects.model.js";
import { Student } from "../models/student.model.js";
export const createReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { percentage, studentID, subject, effort, attainment } = req.body;

    const student = await Student.findOne({ studentID });
    const findSubjectOfStudent = await StudentsSubjects.findOne({
      studentID: student._id,
      subject: subject,
    });
    console.log(findSubjectOfStudent);

    if (!findSubjectOfStudent) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    } else {
      findSubjectOfStudent.percentage = percentage;
      findSubjectOfStudent.effort = effort;
      findSubjectOfStudent.attainment = attainment;
      await findSubjectOfStudent.save();
      res.status(200).json({
        success: true,
        message: "Data added successfully!",
        data: findSubjectOfStudent,
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




export const getStudentsWithYearAndSubjects = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    const { year, subject } = req.body;

    const studentsOfYear = await Student.find({ year });

    // Get students' IDs
    const studentIDs = studentsOfYear.map((student) => student._id);

    // Find subjects for these students where subject is Physics
    const studentsWithSubject = await StudentsSubjects.find({
      studentID: { $in: studentIDs },
      subject,
    });

    console.log(studentsWithSubject)

    // If no students are found, return a message
    if (studentsWithSubject.length === 0) {
      return res
        .status(404)
        .json({ message: `No students of ${year} with ${subject} found` });
    }

    // Populate student details
    const students = await Promise.all(
      studentsWithSubject.map(async (subjectRecord) => {
        const student = await Student.findById(subjectRecord.studentID);
        return {
          studentID: student.studentID,
          name: student.name,
          year: student.year,
          teacher:student.teacher,
          subject: subjectRecord.subject,
          percentage: subjectRecord.percentage,
          effort: subjectRecord.effort,
          attainment: subjectRecord.attainment,
        };
      })
    );

    res.status(200).json({
      success: true,
      message:"students found succesfully",
      students: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// subject: {
//     type: String,
// },
// percentage: {
//     type: String,
// },
// effort: {
//     type: String,
// },
// attainment: {
//     type: String,
// },
// teacher: {
//     type: String,
// },
// studentID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
// }
