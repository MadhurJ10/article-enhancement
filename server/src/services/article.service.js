import MongoArticleRepo from "../repositories/implementations/mongoArticleRepo.js";
import { cleanText } from "../utils/cleanText.js";
import { AppError } from "../utils/errors.js";
import GoogleService from "./google.service.js";
import llmService from "./llm.service.js";
import scrapeService from "./scrape.service.js";



class articleService{
    constructor(){
        this.articleRepo = new MongoArticleRepo();
        this.googleService = new GoogleService();
    }

    async getArticle(id){
        const exist = await this.articleRepo.getArticle(id);

        if(!exist) throw new AppError("article not defined" , 400);

        return exist;
    }

    async updateArticle(id , data){
        const update = await this.articleRepo.updateArticle(id ,data) 

        if(!update) throw new AppError("NOT UPDATED" , 400)

            return update
    }

    async improveArticle(id){
        const article = await this.getArticle(id); //get the orignal article 

        const search = await this.googleService.search("system design"); //get the googles 2 top link
        console.log(search);
        
        const scrapedArticles = await scrapeService.scrapeTopTwo(search);

        const ref1 = cleanText(scrapedArticles[0].content)
        const ref2 = cleanText(scrapedArticles[1].content)
        
        const improve = await llmService.improveArticle("it is for scalabitly and ", ref1, ref2);
        console.log(improve)

        const update = await this.updateArticle(id ,improve);

        return article
    }
}


export default articleService