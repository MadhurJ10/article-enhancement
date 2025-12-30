import express from "express"
import startScraping from "./services/scrapeBeyondChats.js";
import articleRoute from "./routes/article.route.js"

const app = express();

app.use(express.json());
app.use("/api/article" , articleRoute)

export default app;