import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/modelSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fill full form ",400));
    }
    // Create a new message document in the database
    await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    // Respond with a success message
    res.status(200).json({
        success: true,
        message: "Successful",
    });
});
