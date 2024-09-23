import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"], 
    minLength: [3, "Must contain at least three letters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Must contain at least three letters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email address",
    },
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Invalid number"],
    maxLength: [10, "Invalid number"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "Too short"],
    maxLength: [13, "Too long"],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String, 
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Should be more than 8 characters"],
    maxLength: [16, " Error,Should be less than 16 characters"],
    select: false, 
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDept: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); 
  next(); 
});

userSchema.methods.comp = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
