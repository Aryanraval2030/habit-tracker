import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true, 
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(200).send("User registered successfully!");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
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
