const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { userModel } = require("../models/userModel");

const userRoute = express.Router();

// SignUP Route
userRoute.post("/register", async (req, res) => {
  // Added (req, res) parameters
  try {
    const { name, email, password, number } = req.body;

    // Validation
    if (!name || !email || !password || !number) {
      return res.status(400).json("Improper Registration Fields");
    }

    // Checking Email If Present
    let user = await userModel.findOne({ email });

    // If user Exists
    if (user) {
      return res.status(409).json("User Already Exists");
    }

    // Hashing the password
    let hash = bcrypt.hashSync(password, 10);
    let data = {
      name,
      email,
      password: hash,
      number,
    };

    // Create new user and Save User Data
    let userData = new userModel(data);
    await userData.save();
    return res.status(201).json("User Registered Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in registration", error });
  }
});

// Login Route
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Form Validation
    if (!email || !password) {
      return res.status(400).json("Improper Login Fields.");
    }
    // Checking E-mail
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json("User Not Found");
    }

    // Checking Password
    const hash = user.password;
    let passwordCheck = bcrypt.compareSync(password, hash);

    if (passwordCheck) {
      let token = jwt.sign({ user }, process.env.secret);
      return res.status(200).send( {token} );
    } else {
      return res.status(400).json({ msg: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in login", error });
  }
});

module.exports = userRoute;
