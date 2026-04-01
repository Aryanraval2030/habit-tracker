import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Habit = mongoose.model("register", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newHabit = new Habit({
      name,
      email,
      password,
    });

    await newHabit.save();

    res.send("user saved and registed!");
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

mongoose
  .connect(
    "mongodb+srv://aryan2030:aryan682007@cluster0.wcopjgy.mongodb.net/habitTracker",
  )
  .then(() => console.log("connected atlas"))
  .catch((err) => console.log("error here.. ", err));


  app.listen("3001",()=>{
    console.log("server is runnig.")
  })