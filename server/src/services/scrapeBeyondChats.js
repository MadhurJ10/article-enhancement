import axios from "axios";
import * as cheerio from "cheerio";


const API_URL = "http://localhost:3000/articles";

const LAST_PAGE_URL = "https://beyondchats.com/blogs/page/14/";

async function scrapeLastPage() {
  const { data } = await axios.get(LAST_PAGE_URL);
  const $ = cheerio.load(data);

  const articleLinks = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (
      href &&
      href.includes("/blogs/") &&
      !href.includes("/page/")
    ) {
      articleLinks.push(href);
    }
  });

  // Remove duplicates & take 5
  const uniqueLinks = [...new Set(articleLinks)].slice(0, 5);
  return uniqueLinks;
}

async function scrapeArticle(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();
  let content = $("article").text().trim();

  // Fallback if <article> not found
  if (content.length < 200) {
    content = $("main").text().trim();
  }

  return { title, content, sourceUrl: url };
}

// async function saveArticle(article) {
//   await axios.post(API_URL, article);
//   console.log("Saved:", article.title);
// }

async function startScraping() {
  try {
    const links = await scrapeLastPage();
    console.log("Found article links:", links);

    for (const link of links) {
      const article = await scrapeArticle(link);
    //   await saveArticle(article);
    console.log(article)
    }


    console.log("✅ Phase 1 scraping completed");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// startScraping();

export default startScraping;