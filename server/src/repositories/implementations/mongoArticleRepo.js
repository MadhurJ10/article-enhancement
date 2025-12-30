import articleModel from "../../models/article.model.js";
import { AppError } from "../../utils/errors.js";
import IArticleRepo from "../contracts/IArticleRepo.js";


class MongoArticleRepo extends IArticleRepo{
    async createArticle(){

    }

    async getAllArticle(){

    }

    async getArticle(id){
        try {
            console.log("from mogo")
            return articleModel.findById(id);
        } catch (error) {
            
        }
    }

    async deleteArticle(){

    }

    async updateArticle(id , update){
        try {
            return await articleModel.findByIdAndUpdate(id , update);
        } catch (error) {
            throw new AppError("failed");
        }
    }
}

export default MongoArticleRepo;