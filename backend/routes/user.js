const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//Sign - up
router.post("/sign-up", async (req, res) => {
  try {
    // Validate username format
    const usernameLength = req.body.username.length;
    if (usernameLength < 4) {
      return res.status(400).json({
        status: "Error",
        message: "Username must have at least 4 characters.",
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid email format. Please enter a valid email address.",
      });
    }

    // Check the length of the password
    const password = req.body.password;
    const passLength = password.length;
    if (passLength < 6) {
      return res.status(400).json({
        status: "Error",
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if username or email already exists
    const usernameExists = await User.findOne({ username: req.body.username });
    const emailExists = await User.findOne({ email: req.body.email });
    if (usernameExists || emailExists) {
      return res.status(400).json({
        status: "Error",
        message: usernameExists
          ? "Username already exists"
          : "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if role is provided and valid (buyer or seller)
    const role = req.body.role;
    if (!role || (role !== "buyer" && role !== "seller")) {
      return res.status(400).json({
        status: "Error",
        message: "Role must be either 'buyer' or 'seller'.",
      });
    }

    // Create a new user
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      address: req.body.address,
      role: role, // Add role here
    });

    // Save the user to the database
    await user.save();

    return res.json({
      status: "Success",
      message: "Signup successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    console.log("found user", user.username)
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: user.username },
          { role: user.role },
          { jti: jwt.sign({}, "bookStore123") },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });

        res.json({
          _id: user._id,
          role: user.role,
          token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: "Internal Error" });
  }
});

//Get Users (individual) Profile Data
router.get("/getUserData", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const data = await User.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//Update address
router.put("/update-user-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({
      status: "Success",
      message: "Address updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
