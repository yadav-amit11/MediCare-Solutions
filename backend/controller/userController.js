import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, role, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !role || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Registered!", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password, 
        role,
    });

    res.status(201).json({
        success: true,
        message: "User Registered!",
    });
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;


    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide all details", 400));
    }

   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }


    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User role does not match", 400));
    }
    res.status(200).json({
        success: true,
        message: "Login successful",
    });
});
