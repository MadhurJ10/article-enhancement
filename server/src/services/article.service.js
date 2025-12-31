import MongoArticleRepo from "../repositories/implementations/mongoArticleRepo.js";
import { AppError } from "../utils/errors.js";
import GoogleService from "./google.service.js";


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

    async improveArticle(id){
        const article = await this.getArticle(id); //get the orignal article 

        const search = await this.googleService.search("system design"); //get the googles 2 top link



        return article
        //scrape service add here

        //google search result 
    }
}


export default articleService