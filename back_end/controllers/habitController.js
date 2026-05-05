import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// 1. REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // plainPassword: password,
      selectedHabits: { selected: [], custom: [] },
      completedHabits: {
        date: new Date().toDateString(),
        default: [],
        custom: [],
      },
      habitHistory: {},
    });

    await newUser.save();

    // Generate JWT and set Cookie
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for cross-origin cookies on HTTPS
      sameSite: "none", // required for cross-origin cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User registered successfully!",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

// 2. LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User not found");

    // Check pass
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      // In case we have non-hashed passwords from earlier
      isMatch = password === user.password;
    }

    if (!isMatch && password !== user.password) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for cross-origin cookies on HTTPS
      sameSite: "none", // required for cross-origin cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

// 3. ME (Auth Verify & Retrieve user data)
export const userAddHabits = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Ensure completing habits matches current date, reset if new day
    const today = new Date().toDateString();
    let isUpdated = false;
    if (user.completedHabits?.date !== today) {
      user.completedHabits = { date: today, default: [], custom: [] };
      isUpdated = true;
    }

    // Validate schema
    if (!user.selectedHabits) {
      user.selectedHabits = { selected: [], custom: [] };
      isUpdated = true;
    }
    if (!user.habitHistory) {
      user.habitHistory = {};
      isUpdated = true;
    }

    if (isUpdated) {
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. LOGOUT
export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).send("Logged out");
};

// 5. UPDATE HABITS DATA
export const updateHabits = async (req, res) => {
  try {
    const { selectedHabits, completedHabits, habitHistory } = req.body;

    const updateData = {};
    if (selectedHabits !== undefined)
      updateData.selectedHabits = selectedHabits;
    if (completedHabits !== undefined)
      updateData.completedHabits = completedHabits;
    if (habitHistory !== undefined) updateData.habitHistory = habitHistory;

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      message: "Habits updated",
      user: {
        selectedHabits: user.selectedHabits,
        completedHabits: user.completedHabits,
        habitHistory: user.habitHistory,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
