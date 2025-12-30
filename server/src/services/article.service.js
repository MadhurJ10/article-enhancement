import MongoArticleRepo from "../repositories/implementations/mongoArticleRepo.js";
import { AppError } from "../utils/errors.js";

class articleService{
    constructor(){
        this.articleRepo = new MongoArticleRepo();
    }

    async getArticle(id){
        console.log(id)
        console.log("from service")
        const exist = await this.articleRepo.getArticle(id);

        if(!exist) throw new AppError("article not defined" , 400);

        return exist;
    }
}


export default articleService