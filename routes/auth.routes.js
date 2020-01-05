const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal password length 6 symbols").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "Such user already exists" });
      }
      const hashedPAssword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPAssword });
      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong, try again server error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Enter correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Enter password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data"
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong, try again server error" });
    }
  }
);
module.exports = router;
