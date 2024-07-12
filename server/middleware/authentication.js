import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login First",
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeToken._id);
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login first",
    }); 
  }
};

export { isAuthentication };
