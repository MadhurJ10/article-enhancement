import express from "express"
import startScraping from "./services/scrapeBeyondChats.js";


const app = express();

app.get('/' , async (req ,res) => {
    
    res.send("kjskjdaskjndas")
    
})

export default app;