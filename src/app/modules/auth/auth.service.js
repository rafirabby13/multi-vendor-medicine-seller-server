import jwt from "jsonwebtoken";
import { config } from "dotenv";  

// Load environment variables
config();

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "5h",
  });
  return token;
};

export const authService = {
  generateToken,
};
