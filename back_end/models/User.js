import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  // plainPassword: String, // Added to allow viewing password as requested
  // habits state mapped from user requirements
  selectedHabits: {
    selected: [Number],
    custom: [{ title: String, time: String }],
  },
  completedHabits: {
    date: String,
    default: [Number],
    custom: [Number], // indexes
  },
  habitHistory: { type: mongoose.Schema.Types.Mixed, default: {} },
});

export const User = mongoose.model("User", userSchema);
