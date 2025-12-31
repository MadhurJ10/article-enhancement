import express from "express";
import cors from "cors";
import articleRoute from "./routes/article.route.js";

const app = express();

/* ✅ Global CORS — enough for all browsers */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/article", articleRoute);

/* health check */
app.get("/", (req, res) => {
  res.send("API live 🚀");
});

export default app;
