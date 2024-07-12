import { StudentsSubjects } from "../models/studentsSubjects.model.js";
import { Student } from "../models/student.model.js";

export const getSpecificStudentData = async (req, res) => {
    try {
      const { year } = req.params; 

  
      const students = await Student.find({ year }).exec();
      console.log(students);
  
      if (students.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No students found",
        });
      }
  
      const subjectIds = students.flatMap(student => student.subjects);
      const subjects = await StudentsSubjects.find({ _id: { $in: subjectIds } }).exec();
  
      const subjectMap = new Map(subjects.map(subject => [subject._id.toString(), subject]));
  
      const results = students.map(student => {
        const studentSubjects = student.subjects.map(subjectId => subjectMap.get(subjectId.toString()) || {});
        return {
          _id: student._id,
          studentID: student.studentID,
          name: student.name,
          year: student.year,
          subjects: studentSubjects,
        };
      });
  
      return res.status(200).json({
        success: true,
        message: "Specific Students and their subjects found successfully",
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