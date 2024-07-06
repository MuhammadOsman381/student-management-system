import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
    year: {
        type: String,
    },
});

export const Year = mongoose.model("Year", yearSchema);
