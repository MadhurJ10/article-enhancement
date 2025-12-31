import axios from "axios"
import { AppError } from "../utils/errors.js"
import config from "../config/environment.js";

const { SERP_API_KEY } = config;

class GoogleService {
    async search(query) {
        console.log("1chchch");
        
        try {
            console.log("2 chchch");
            
            const response = await axios.get(
                "https://serpapi.com/search.json",
                {
                    params: {
                        q: query,
                        engine: "google",
                        api_key: SERP_API_KEY,
                        num: 5
                    }
                }
            );

            const results = response.data.organic_results || [];

            // filter only articles/blogs (basic heuristic)
            const links = results
                .map(r => r.link)
                .filter(link =>
                    link &&
                    !link.includes("beyondchats.com") &&
                    !link.includes("medium.com") &&
                    !link.includes("in.pinterest.com") &&
                    !link.includes("amazon.in") &&
                    !link.includes("roadmap.sh") 
                )
                .slice(0, 2);

            if (links.length < 2) {
                throw new AppError("Not enough reference articles found", 400);
            }

            return links;
        } catch (error) {
            throw new AppError("Google search failed", 500);

        }
    }
}

export default GoogleService