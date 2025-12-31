import axios from "axios";
import * as cheerio from "cheerio";
import { AppError } from "../utils/errors.js";

class ScrapeService {
  constructor() {
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    };
  }

  /**
   * Scrape main article content from a URL
   */
  async scrapeArticle(url) {
    try {
      const response = await axios.get(url, {
        headers: this.headers,
        timeout: 10000
      });

      const $ = cheerio.load(response.data);

      let content = this.extractMainContent($);

      if (!content || content.length < 200) {
        throw new Error("Content too short or not found");
      }

    //   console.log(content);
      
      return content;
    } catch (error) {
      console.error("Scraping failed for:", url);
      throw new AppError("Failed to scrape article content", 500);
    }
  }

  /**
   * Scrape top two articles from Google search results
   */
  async scrapeTopTwo(urls) {
    if (!Array.isArray(urls) || urls.length < 2) {
      throw new AppError("Invalid URLs for scraping", 400);
    }

    const scraped = [];

    for (let i = 0; i < 2; i++) {
      const url = urls[i];
      const content = await this.scrapeArticle(url);

      scraped.push({
        url,
        content
      });
    }

    return scraped;
  }

  /**
   * Extract main readable content using fallbacks
   */
  extractMainContent($) {
    const selectors = [
      "article",
      "main",
      ".post-content",
      ".article-content",
      ".blog-content",
      ".content"
    ];

    // 1️⃣ Try common semantic selectors
    for (const selector of selectors) {
      const text = $(selector).text().trim();
      if (text.length > 500) {
        return this.cleanText(text);
      }
    }

    // 2️⃣ Fallback: longest text block heuristic
    let longestText = "";

    $("body *").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > longestText.length) {
        longestText = text;
      }
    });

    return this.cleanText(longestText);
  }

  /**
   * Basic text cleanup
   */
  cleanText(text) {
    return text
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();
  }
}

export default new ScrapeService();
