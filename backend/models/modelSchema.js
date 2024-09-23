import mongoose from "mongoose";
import validator from "validator";

const mongooseSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, "Must contain at least three letters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Must contain at least three letters"],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true, // removes any leading or trailing whitespace from the email
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Invalid number"],
        maxLength: [10, "Invalid number"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Too short"],
        maxLength: [150, "Too large"],
    }
});
export const Message = mongoose.model("Message", mongooseSchema);
