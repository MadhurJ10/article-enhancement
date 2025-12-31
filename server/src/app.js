import express from "express"
import startScraping from "./services/scrapeBeyondChats.js";
import articleRoute from "./routes/article.route.js"
import cors from 'cors'

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/article" , articleRoute)

export default app;