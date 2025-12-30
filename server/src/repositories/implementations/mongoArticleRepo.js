import articleModel from "../../models/article.model";
import { AppError } from "../../utils/errors";
import IArticleRepo from "../contracts/IArticleRepo";


class MongoArticleRepo extends IArticleRepo{
    async createArticle(){

    }

    async getAllArticle(){

    }

    async getArticle(){

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