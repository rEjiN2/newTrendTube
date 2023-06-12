import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../../error.js";
import jwt from "jsonwebtoken";


export const signUp = asyncHandler(async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT);
    const { password, ...others } = newUser._doc;
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
    })
      .status(200)
      .json(others);

  } catch (err) {
    next(err);
  }
});

export const signIn = async (req, res, next) => {
  
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User Not Found"));
    }

    if (user.suspended) {
      return next(createError(403, "You are blocked for 7 days"));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Password doesn't Match"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
    })
      .status(200)
      .json(others);


  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.cookie("access_token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res.cookie("access_token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
        
    res.clearCookie("access_token");
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

