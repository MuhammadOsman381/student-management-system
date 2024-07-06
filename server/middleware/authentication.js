import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Login First",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeToken._id);
    next();
  } catch (error) {
    console.error("Error in isAuthentication middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { isAuthentication };
