import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

app.use("/api/v2/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Server is running...</h1>");
});
app.listen(port, () => {
  console.log("Server is running at port :", port);
});
