import mongoose from "mongoose";

const teacherSubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const TeachersSubjects = mongoose.model("TeachersSubjects", teacherSubjectSchema);
