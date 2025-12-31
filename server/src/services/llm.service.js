
import Groq from "groq-sdk";
import { AppError } from "../utils/errors.js";
import config from "../config/environment.js";
import improveArticlePrompt from "../lib/prompt/improveArticle.js";

const { GROQ_API_KEY } = config;

class LLMService {
    constructor() {
        this.client = new Groq({
            apiKey: GROQ_API_KEY
        });
    }

    async improveArticle(originalContent, referenceOne, referenceTwo) {
        try {
            const prompt = `${improveArticlePrompt}

ORIGINAL ARTICLE:
"""
${originalContent}
"""

REFERENCE ARTICLE 1:
"""
${referenceOne}
"""

REFERENCE ARTICLE 2:
"""
${referenceTwo}
"""
`;

// const prompt = "what is capital of india"

            const completion =
                await this.client.chat.completions.create({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an expert technical writer. Improve the article using references without copying content."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 1200
                });

            const response =
                completion.choices?.[0]?.message?.content;

            if (!response) {
                throw new Error("Empty Groq response");
            }

            return response.trim();
        } catch (error) {
            console.error("Groq error:", error);
            throw new AppError(
                "Failed to improve article using LLM",
                500
            );
        }
    }
}

export default new LLMService();
