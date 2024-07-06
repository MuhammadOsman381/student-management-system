import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
});

export const Subject = mongoose.model("Subject", subjectSchema);
