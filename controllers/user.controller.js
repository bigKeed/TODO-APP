const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

exports.signup = (req, res) => {
  res.render("signup");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.logout = (req, res) => {
  res.cookie = ("token", "none", { expires: Date.now * 1000 });

  res.redirect("/login");
};

exports.createUser = async (req, res) => {
  const { email, username, password } = req.body;

  // Check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.json("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, username, password: hashedPassword });
  await user.save();
  res.redirect("/login");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  try {
    res.redirect("/tasks");
  } catch (err) {
    console.error("Error during login:", err.message);
    res.render("login", {
      errorMessage: "Error during login. Please try again.",
      successMessage: null,
    });
  }
};
