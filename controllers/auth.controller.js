import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const tokenBlacklist = new Set();

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("email already exists");
      error.status = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      { session },
    );
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (err) {
    console.log("DEBUG ERROR:", err);
    res.status(400).json({
      success: false,
      error: err.message || err.toString(),
    });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user },
    });
  } catch (err) {
    next(err);
    console.log("DEBUG ERROR:", err);
    res.status(400).json({
      success: false,
      error: err.message || err.toString(),
    });
  }
};

export const signOut = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "no token provided",
      });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      res.status(401).json({
        message: "failed to authorize",
        success: false,
      });
    }

    tokenBlacklist.add(token);
    res.status(200).json({
      message: "User signed out successfully",
      success: true,
    });
  } catch (error) {
    error = new Error("Unable to Sign Out");
    res.status(500).json({
      success: false,
      message: "sign out failed",
      error: error.message,
    });
  }
};
