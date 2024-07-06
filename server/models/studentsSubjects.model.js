import mongoose from "mongoose";

const studentSubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    percentage: {
        type: String,
    },
    effort: {
        type: String,
    },
    attainment: {
        type: String,
    },
    teacher: {
        type: String,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }
});

export const StudentsSubjects = mongoose.model("StudentsSubjects", studentSubjectSchema);
