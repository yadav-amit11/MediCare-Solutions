import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
// import { generateToken } from "../utils/jwtToken.js";
// import cloudinary from "cloudinary";
// import bcrypt from "bcryptjs"; 

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;


    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Registered!", 400));
    }

    
    //const hashedPassword = await bcrypt.hash(password, 10);


    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password, // Store the hashed password
        role,
    });

    
    res.status(201).json({
        success: true,
        message: "User Registered!", 
    });
});
