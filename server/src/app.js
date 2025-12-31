import express from "express";
import cors from "cors";
import articleRoute from "./routes/article.route.js";

const app = express();

/* 🔥 FORCE CORS (Railway-safe) */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 HANDLE PREFLIGHT */
app.options("*", cors());

app.use(express.json());

app.use("/api/article", articleRoute);

/* 🔥 Root test route */
app.get("/", (req, res) => {
  res.send("API live 🚀");
});

export default app;
