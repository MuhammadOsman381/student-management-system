import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
  },
  name: {
    type: String,
  },
  year:
  {
    type: String,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  }],
  marks: {
    type: String,
  },


});

export const Student = mongoose.model("Student", studentSchema);

