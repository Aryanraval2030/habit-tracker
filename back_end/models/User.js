import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  // for register
  name: String,
  email: { type: String, unique: true },
  password: String,

  // fore add custom habits
  selectedHabits: {
    selected: [Number],
    custom: [{ title: String, time: String }],
  },

  // for given habits add
  completedHabits: {
    date: String,
    default: [Number],
    custom: [Number],
  },
  habitHistory: { type: mongoose.Schema.Types.Mixed, default: {} },
});

export const User = mongoose.model("User", userSchema);
