import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api", router);

const serverRun = async () => {
  try {
    await connectDb();
    // frontend usually runs on 5173, so allowing origin.

    // const JWT_SECRET = "super_secret_jwt_key_habit_tracker_2030";

    // Server start
    app.listen(process.env.PORT, () => {
      console.log("Server running");
    });
  } catch (error) {
    console.error("error in server.js : ", error.message);
  }
};

serverRun();
