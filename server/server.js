import app from "./src/app.js"
import { connectDB } from "./src/config/database.js";
import config from "./src/config/environment.js"


const { PORT } = config


async function startServer() {

    try {
        await connectDB();
        // console.log("db succesful");


        app.listen(PORT, () => {
            console.log("server started")
        })
    } catch (error) {
        console.log(error);
    }

}

startServer();