import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());
// frontend usually runs on 5173, so allowing origin.
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

const JWT_SECRET = "super_secret_jwt_key_habit_tracker_2030";

// --- MIDDLEWARE ---
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// --- SCHEMA & MODEL ---
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  
  // habits state mapped from user requirements
  selectedHabits: {
    selected: [Number],
    custom: [{ title: String, time: String }],
  },
  completedHabits: {
    date: String,
    default: [Number],
    custom: [Number],  // indexes
  },
  habitHistory: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const User = mongoose.model("User", userSchema);

// --- ROUTES ---

// 1. REGISTER
app.post("/register", async (req, res) => {
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
      selectedHabits: { selected: [], custom: [] },
      completedHabits: { date: new Date().toDateString(), default: [], custom: [] },
      habitHistory: {}
    });

    await newUser.save();

    // Generate JWT and set Cookie
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if using https
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ message: "User registered successfully!", user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// 2. LOGIN
app.post("/login", async (req, res) => {
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
      isMatch = (password === user.password);
    }
    
    if (!isMatch && password !== user.password) {
       return res.status(400).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// 3. ME (Auth Verify & Retrieve user data)
app.get("/me", authMiddleware, async (req, res) => {
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
});

// 4. LOGOUT
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
});

// 5. UPDATE HABITS DATA
app.post("/update-habits", authMiddleware, async (req, res) => {
  try {
    const { selectedHabits, completedHabits, habitHistory } = req.body;
    
    const updateData = {};
    if (selectedHabits !== undefined) updateData.selectedHabits = selectedHabits;
    if (completedHabits !== undefined) updateData.completedHabits = completedHabits;
    if (habitHistory !== undefined) updateData.habitHistory = habitHistory;

    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
    
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Habits updated", user: {
      selectedHabits: user.selectedHabits,
      completedHabits: user.completedHabits,
      habitHistory: user.habitHistory
    }});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


mongoose
  .connect(
    "mongodb+srv://aryan2030:aryan682007@cluster0.wcopjgy.mongodb.net/habitTracker",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

// ✅ Server start
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
