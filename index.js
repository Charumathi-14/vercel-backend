import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/conectDB.js";
import userRouter from "./routes/UserRouter.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import AuthorRouter from "./routes/AuthorRouter.js";
import BookAPIRouter from "./routes/BookAPIRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import historyRouter from "./routes/historyRoutes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vercel-frontend-gamma-eight.vercel.app",
      "https://vercel-frontend-1b6rsmr1e-charumathi-14s-projects.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/books", express.static("public/books"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", categoryRoutes);
app.use("/api/search-authors", AuthorRouter);
app.use("/api/books", BookAPIRouter);
app.use("/api/history", historyRouter);
app.use("/api", feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on PORT: ${PORT}`);
});