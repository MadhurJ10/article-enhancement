import dotenv from "dotenv";
dotenv.config();

export default{
 MONGO_URI: process.env.MONGO_URI,
 PORT: process.env.PORT || 3000,   
 SERP_API_KEY:process.env.SERP_API_KEY,
 GOOGLE_API_KEY:process.env.GOOGLE_API_KEY,
 GROQ_API_KEY:process.env.GROQ_API_KEY
}