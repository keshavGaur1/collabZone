import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Autherization")?.replace("Bearer " , ""); // Retrieve token from cookies

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

     // Fetch user from database
     const user = await User.findById(decode.userId).select("-password -refreshToken");

     if (!user) {
       return res.status(401).json({
         message: "User not found",
         success: false,
       });
     }
 
     // Attach the user object to the request
     req.user = user;
    // Attach the user ID to the request object
    req.id = decode.userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;