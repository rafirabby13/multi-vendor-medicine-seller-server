import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";

const createToken = catchAsync(async (req, res) => {
  const user = req.body;
  const token = authService.generateToken(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token generated successfully",
    data: { token },
  });
});

export const authController = {
  createToken,
};
