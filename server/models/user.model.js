import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
  subjects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  userType: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.model("User", userSchema);
